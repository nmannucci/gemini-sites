import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://betterbaseballtraining.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
