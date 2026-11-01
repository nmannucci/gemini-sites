import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { parseEnv } from 'node:util';

// Match Astro/Vite precedence while copying only the public pixel ID into code.
// Astro reads this same build setting via import.meta.env. Generate its CAPI
// counterpart for Wrangler; no access token is written here.
const mode = process.argv[2] || (process.env.WRANGLER_COMMAND === 'dev' ? 'development' : 'production');
let values = {};
for (const name of ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`]) {
  try {
    values = { ...values, ...parseEnv(await readFile(name, 'utf8')) };
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
const pixelId = (process.env.PUBLIC_META_PIXEL_ID ?? values.PUBLIC_META_PIXEL_ID ?? '').trim();
if (pixelId && !/^\d{5,20}$/.test(pixelId)) {
  throw new Error('PUBLIC_META_PIXEL_ID must be a numeric Meta Pixel/Dataset ID.');
}
await mkdir('.wrangler', { recursive: true });
const content = `// Generated from PUBLIC_META_PIXEL_ID by scripts/configure-meta.mjs.\nexport const META_PIXEL_ID = ${JSON.stringify(pixelId)};\n`;
const path = '.wrangler/meta-pixel.ts';
if (await readFile(path, 'utf8').catch(() => '') !== content) await writeFile(path, content);
