import { Miniflare } from 'miniflare';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';

export async function createHarness(port?: number, configured = true) {
  const bundle = await build({ entryPoints: ['src/worker.ts'], write: false, bundle: true, format: 'esm', platform: 'browser', target: 'es2022' });
  const emails: Array<{ body: any; key: string | null }> = [];
  const leads: Array<any> = [];
  let emailFails = false;
  let emailGate: Promise<void> | null = null;
  let releaseEmail: (() => void) | null = null;
  const mf = new Miniflare({
    modules: true, script: bundle.outputFiles[0].text, compatibilityDate: '2026-08-06', compatibilityFlags: ['nodejs_compat'],
    ...(port ? { port, host: '127.0.0.1' } : {}),
    bindings: { GHL_WAIVER_WEBHOOK_URL: configured ? 'https://ghl.test/waiver' : '', WAIVER_LINK_KEY: 'local-test-only-256-bit-key-value', GHL_WEBHOOK_URL: 'https://ghl.test/lead' },
    d1Databases: ['DB'],
    serviceBindings: {
      ASSETS: async (req: Request) => {
        const path = decodeURIComponent(new URL(req.url).pathname);
        const relative = path === '/' ? '/index.html' : extname(path) ? path : path.replace(/\/$/, '') + '.html';
        const file = resolve('dist', '.' + relative);
        if (!file.startsWith(resolve('dist') + '/')) return new Response('Forbidden', { status: 403 });
        try {
          const content = await readFile(file);
          const types: Record<string, string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.pdf': 'application/pdf' };
          return new Response(content, { headers: { 'content-type': types[extname(file)] || 'application/octet-stream' } });
        } catch { return new Response('Not found', { status: 404 }); }
      },
    },
    outboundService: async (req: Request) => {
      if (req.url === 'https://ghl.test/waiver') {
        emails.push({ body: await req.json(), key: req.headers.get('idempotency-key') });
        if (emailGate) await emailGate;
        return Response.json(emailFails ? { error: 'simulated outage' } : { status: 'Success: request sent to trigger execution server', id: 'ghl-test-' + emails.length }, { status: emailFails ? 503 : 200 });
      }
      if (req.url.startsWith('https://ghl.test/')) { leads.push(await req.json()); return Response.json({ ok: true }); }
      throw new Error('Unexpected outbound request: ' + req.url);
    },
  });
  const db = await mf.getD1Database('DB');
  for (const name of ['0001_leads.sql', '0002_add_source.sql', '0003_zumba_waivers.sql', '0004_signup_preferences.sql']) {
    const sql = (await readFile(join('migrations', name), 'utf8')).replace(/^--.*$/gm, '');
    for (const statement of sql.split(';').filter((s) => s.trim())) await db.prepare(statement).run();
  }
  const post = (body: unknown, options: RequestInit = {}) => mf.dispatchFetch('http://localhost/api/zumba-waiver', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), ...options });
  const waitForDelivery = async (id: string, status = 'sent') => {
    for (let attempt = 0; attempt < 100; attempt++) {
      const row = await db.prepare('SELECT email_status, email_attempts FROM zumba_waivers WHERE id = ?').bind(id).first();
      if (row?.email_status === status && Number(row.email_attempts) > 0) return;
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    throw new Error('Timed out waiting for waiver notification: ' + status);
  };
  const holdEmail = () => { emailGate = new Promise<void>((resolve) => { releaseEmail = resolve; }); };
  const resumeEmail = () => { releaseEmail?.(); emailGate = null; releaseEmail = null; };
  return { mf, db, emails, leads, post, waitForDelivery, holdEmail, resumeEmail, setEmailFails: (value: boolean) => { emailFails = value; } };
}
