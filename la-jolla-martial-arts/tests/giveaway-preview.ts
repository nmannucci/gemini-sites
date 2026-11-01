// Local QA only: like zumba-preview, but with Turnstile enforced (single-use tokens, mocked siteverify).
// Build with PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA (Cloudflare's always-pass test key).
import { createHarness } from './zumba-harness';
const harness = await createHarness(Number(process.env.GIVEAWAY_QA_PORT || 8792), true, '', { turnstileSecret: 'local-test', turnstileOk: true });
console.log('Local giveaway QA preview:', String(await harness.mf.ready));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await harness.mf.dispose(); process.exit(0); });
