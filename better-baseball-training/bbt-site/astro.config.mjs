import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.betterbaseballtraining.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
