import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages that must never appear in the sitemap. These are also noindex in Layout.astro —
// the two lists have to stay in sync, or the sitemap starts advertising noindex URLs.
const EXCLUDED = ['/404', '/privacy-policy'];

const cleanPath = (pathname) =>
  pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');

export default defineConfig({
  site: 'https://www.betterbaseballtraining.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDED.includes(cleanPath(new URL(page).pathname)),
      // build.format 'file' puts '/schedule.html' style URLs in the sitemap, but production
      // serves the clean paths and canonicals point there. Rewrite so they match.
      serialize(item) {
        const url = new URL(item.url);
        url.pathname = cleanPath(url.pathname);
        item.url = url.toString();
        return item;
      },
    }),
  ],
});
