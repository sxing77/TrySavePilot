import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const DEFAULT_SITE = 'http://localhost:4321';

function resolveSite(rawUrl) {
  if (!rawUrl) return DEFAULT_SITE;

  try {
    const url = new URL(rawUrl.trim());
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return DEFAULT_SITE;
    return url.origin;
  } catch {
    return DEFAULT_SITE;
  }
}

const site = resolveSite(process.env.SITE_URL);

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
