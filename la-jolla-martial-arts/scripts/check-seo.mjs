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
  assert(sitemap.includes('https://lajollatkd.com/programs'), 'Sitemap missing unique /programs URL');
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

if (existsSync(join(dist, '_redirects'))) {
  const redirects = readFileSync(join(dist, '_redirects'), 'utf8');
  assert(!/^\s*\/programs\s+/m.test(redirects), '_redirects must not 301 /programs now that it is a unique page');
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

  const homePath = join(dist, 'index.html');
  const programsPath = join(dist, 'programs.html');
  assert(existsSync(programsPath), 'Missing dist/programs.html unique programs hub');

  if (existsSync(homePath)) {
    const home = readFileSync(homePath, 'utf8');
    const descMatch = home.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    if (descMatch) {
      const description = decodeEntities(descMatch[1]);
      assert(description.length <= 155, `Homepage meta description is ${description.length} chars (need ~150 or less)`);
      assert(!/Pacific Beach|University City|Clairemont/i.test(description), 'Homepage meta still stuffs nearby neighborhood names');
    }
    const homeImages = [...home.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
    homeImages.forEach((tag, index) => {
      assert(/\balt="[^"]+"/i.test(tag), `index.html image ${index + 1} is missing alt`);
      assert(/\btitle="[^"]+"/i.test(tag), `index.html image ${index + 1} is missing title`);
    });
    assert(home.includes('(858) 361-0961'), 'Homepage body/footer is missing the published phone number');
    assert(home.includes('7680 Girard Ave, Basement'), 'Homepage is missing the Basement street address');
  }

  if (existsSync(homePath) && existsSync(programsPath)) {
    const homeTitle = readFileSync(homePath, 'utf8').match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
    const programsHtml = readFileSync(programsPath, 'utf8');
    const programsTitle = programsHtml.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
    const programsH1 = programsHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '';
    assert(programsTitle && programsTitle !== homeTitle, '/programs title must be unique and not match the homepage');
    assert(programsH1.length > 0 && !/Kids Martial Arts,\s*Taekwondo/i.test(programsH1), '/programs must have a unique H1, not the homepage headline');
  }
}

if (failures.length) {
  console.error(`SEO checks failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('SEO checks passed: sitemap, robots, redirects, headers, 404, metadata, canonicals, and noindex exclusions.');
