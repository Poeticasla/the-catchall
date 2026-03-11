import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://the-catchall.netlify.app/",
  integrations: [mdx(), sitemap()],
});
