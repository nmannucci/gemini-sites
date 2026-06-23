#!/usr/bin/env node
/**
 * One-shot converter: legacy-html/*.html -> src/pages/*.astro
 * Wraps body content in <Layout> and rewrites .html links to clean Astro routes.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const PAGE_MAP = [
  { src: 'index.html', out: 'index.astro', programPageCss: false },
  { src: 'about.html', out: 'about.astro', programPageCss: false },
  { src: 'contact.html', out: 'contact.astro', programPageCss: false },
  { src: 'schedule.html', out: 'schedule.astro', programPageCss: false },
  { src: 'adult-martial-arts.html', out: 'adult-martial-arts.astro', programPageCss: true },
  { src: 'kids-martial-arts.html', out: 'kids-martial-arts.astro', programPageCss: true },
  { src: 'teen-martial-arts.html', out: 'teen-martial-arts.astro', programPageCss: true },
  { src: 'little-ninjas.html', out: 'little-ninjas.astro', programPageCss: true },
];

const HTML_TO_ROUTE = {
  'index.html': '/',
  'about.html': '/about',
  'contact.html': '/contact',
  'schedule.html': '/schedule',
  'adult-martial-arts.html': '/adult-martial-arts',
  'kids-martial-arts.html': '/kids-martial-arts',
  'teen-martial-arts.html': '/teen-martial-arts',
  'little-ninjas.html': '/little-ninjas',
  'program-template.html': '/',
};

function pickMeta(html, name) {
  const re = new RegExp(`<meta\\s+(?:property|name)=["']${name}["']\\s+content=["']([\\s\\S]*?)["']\\s*/?\\s*>`, 'i');
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

function pickTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : null;
}

function pickCanonical(html) {
  const m = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function extractStyles(html) {
  // Collect every <style>...</style> block in document order.
  const styles = [];
  const re = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html)) !== null) styles.push(m[1]);
  return styles.join('\n\n');
}

function extractBody(html) {
  // Take everything between </nav> and <footer ...>; this is the page content.
  const navEnd = html.indexOf('</nav>');
  const footerStart = html.search(/<footer\b/i);
  if (navEnd === -1 || footerStart === -1) {
    throw new Error('Could not locate </nav> or <footer> in source');
  }
  return html.slice(navEnd + '</nav>'.length, footerStart).trim();
}

function extractExtraScripts(html) {
  // Pull <script>...</script> blocks after </footer>, EXCLUDING the two standard
  // init scripts (lucide.createIcons + nav scroll, mobile menu) which Layout already provides.
  const idx = html.search(/<\/footer>/i);
  if (idx === -1) return '';
  const tail = html.slice(idx);
  const scripts = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(tail)) !== null) {
    const attrs = m[1] || '';
    const body = m[2] || '';
    // Skip the two standard scripts the Layout already injects.
    if (/lucide\.createIcons\(\)/.test(body) && /window\.addEventListener\(['"]scroll/.test(body)) continue;
    if (/nav-toggle/.test(body) && /mobileMenu/.test(body)) continue;
    scripts.push(`<script${attrs} is:inline>${body}</script>`);
  }
  return scripts.join('\n');
}

function rewriteLinks(s) {
  let out = s;
  for (const [html, route] of Object.entries(HTML_TO_ROUTE)) {
    // href / src to local html (with optional ./ or no slash prefix)
    const re = new RegExp(`(href|src)=(["'])(?:\\./)?${html.replace(/\./g, '\\.')}(["'#?])`, 'g');
    out = out.replace(re, `$1=$2${route}$3`);
    // anchored hrefs like "index.html#reviews"
    const reAnchor = new RegExp(`(href|src)=(["'])(?:\\./)?${html.replace(/\./g, '\\.')}#([^"']*)(["'])`, 'g');
    out = out.replace(reAnchor, `$1=$2${route === '/' ? '' : route}#$3$4`);
  }
  // Rewrite asset paths "assets/..." -> "/assets/..."
  out = out.replace(/(["'(=\s])assets\//g, '$1/assets/');
  // De-double slash leading from href="/assets" already
  out = out.replace(/(["'(=\s])\/\/assets\//g, '$1/assets/');
  return out;
}

function escapeForAstroExpression(str) {
  // For values going into Astro frontmatter as JS strings, escape backticks and ${.
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

for (const page of PAGE_MAP) {
  const srcPath = resolve(root, 'legacy-html', page.src);
  const outPath = resolve(root, 'src/pages', page.out);
  const html = readFileSync(srcPath, 'utf8');

  const title = pickTitle(html) || '';
  const description = pickMeta(html, 'description') || '';
  let canonical = pickCanonical(html);
  if (canonical) {
    canonical = canonical.replace(/\/index\.html$/, '/').replace(/\.html(\?|#|$)/, '$1');
  }
  const ogImage = pickMeta(html, 'og:image');

  const styles = extractStyles(html);
  let body = extractBody(html);
  let extraScripts = extractExtraScripts(html);

  body = rewriteLinks(body);
  extraScripts = rewriteLinks(extraScripts);

  // For program pages, swap inline program-template.js reference -> /program-template.js if present
  // (Layout already injects program-page.css when programPageCss=true)
  // Also strip any literal <script src="program-template.js"> from body (it's at end-of-doc usually)
  body = body.replace(/<script[^>]*src=["']\/?program-template\.js["'][^>]*><\/script>/g, '');
  extraScripts = extraScripts.replace(/<script[^>]*src=["']\/?program-template\.js["'][^>]*><\/script>/g, '');

  const needsProgramTemplateJs = page.programPageCss; // program pages relied on program-template.js

  const fmLines = [
    "import Layout from '../layouts/Layout.astro';",
  ].join('\n');

  const propLines = [];
  if (title) propLines.push(`  title={\`${escapeForAstroExpression(title)}\`}`);
  if (description) propLines.push(`  description={\`${escapeForAstroExpression(description)}\`}`);
  if (canonical) propLines.push(`  canonical={\`${escapeForAstroExpression(canonical)}\`}`);
  if (ogImage) {
    // Convert absolute https://lajollamartialarts.com/... to path; keep as-is otherwise.
    let img = ogImage.replace(/^https?:\/\/lajollamartialarts\.com/, '');
    if (!img.startsWith('/') && !/^https?:/.test(img)) img = '/' + img;
    propLines.push(`  ogImage={\`${escapeForAstroExpression(img)}\`}`);
  }
  if (page.programPageCss) propLines.push('  programPageCss');

  const layoutOpen = `<Layout\n${propLines.join('\n')}\n>`;

  const stylesBlock = styles ? `<style is:global>\n${styles}\n</style>\n\n` : '';
  const headSlot = stylesBlock
    ? `  <Fragment slot="head">\n${stylesBlock}  </Fragment>\n`
    : '';

  const scriptsSlot = (extraScripts || needsProgramTemplateJs)
    ? `  <Fragment slot="scripts">\n${needsProgramTemplateJs ? '<script is:inline src="/program-template.js"></script>\n' : ''}${extraScripts}\n  </Fragment>\n`
    : '';

  const astro = `---\n${fmLines}\n---\n\n${layoutOpen}\n${headSlot}${body}\n\n${scriptsSlot}</Layout>\n`;

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, astro, 'utf8');
  console.log(`✓ ${page.src} → src/pages/${page.out}`);
}
