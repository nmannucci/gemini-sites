import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function filesUnder(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

assert(existsSync(join(dist, 'sitemap-index.xml')), 'Missing dist/sitemap-index.xml');
assert(existsSync(join(dist, 'sitemap-0.xml')), 'Missing dist/sitemap-0.xml');
assert(existsSync(join(dist, 'robots.txt')), 'Missing dist/robots.txt');
assert(existsSync(join(dist, '_redirects')), 'Missing dist/_redirects');
assert(existsSync(join(dist, '_headers')), 'Missing dist/_headers');
assert(existsSync(join(dist, '404.html')), 'Missing dist/404.html');

if (existsSync(join(dist, 'robots.txt'))) {
  const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
  assert(robots.includes('Sitemap: https://lajollatkd.com/sitemap-index.xml'), 'robots.txt does not advertise the sitemap index');
}

if (existsSync(join(dist, 'sitemap-0.xml'))) {
  const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
  for (const excluded of ['/lp/', '/thank-you', '/privacy', '/404', '/review']) {
    assert(!sitemap.includes(`https://lajollatkd.com${excluded}`), `Sitemap includes excluded URL: ${excluded}`);
  }
}

if (existsSync(dist)) {
  for (const file of filesUnder(dist).filter((path) => path.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8');
    const displayPath = relative(dist, file).split(sep).join('/');
    const isNoindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
    const titleCount = (html.match(/<title>/gi) || []).length;
    const descriptionCount = (html.match(/<meta\s+name="description"/gi) || []).length;
    const canonicalCount = (html.match(/<link\s+rel="canonical"/gi) || []).length;

    assert(titleCount === 1, `${displayPath}: expected one title, found ${titleCount}`);
    assert(descriptionCount === 1, `${displayPath}: expected one meta description, found ${descriptionCount}`);
    if (!isNoindex) {
      assert(canonicalCount === 1, `${displayPath}: indexable page must have exactly one canonical, found ${canonicalCount}`);
      assert(html.includes('href="https://lajollatkd.com'), `${displayPath}: canonical must use the apex HTTPS domain`);
    }
  }
}

if (failures.length) {
  console.error(`SEO checks failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('SEO checks passed: sitemap, robots, redirects, headers, 404, metadata, canonicals, and noindex exclusions.');
