import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const excludedFromSitemap = ['/lp/', '/thank-you', '/privacy', '/404', '/review'];

export default defineConfig({
  site: 'https://lajollatkd.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !excludedFromSitemap.some((excluded) =>
          excluded.endsWith('/') ? pathname.startsWith(excluded) : pathname === excluded
        );
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
