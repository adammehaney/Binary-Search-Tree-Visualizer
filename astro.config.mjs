import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: 'https://adammehaney.github.io',
  base: 'Binary-Search-Tree-Visualizer',
  build: {
    assets: 'astro'
  },
  integrations: [icon(), svelte(), sitemap(), robotsTxt()]
});