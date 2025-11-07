import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import playformInline from "@playform/inline";
import compressor from "astro-compressor";
import purgecss from "astro-purgecss";
import { defineConfig } from "astro/config";
import { FontaineTransform } from "fontaine";
import remarkAutolinkHeadings from "remark-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import { remarkReadingTime } from "./plugins/remark-reading-time.ts";
import { config } from "./src/config";

const fontaineOptions = {
  fallbacks: [
    "Oswald Variable",
    "Oswald",
    "Work Sans Variable",
    "Work Sans",
    "JetBrains Mono Variable",
    "JetBrains Mono",
    "system-ui",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
    "SFMono-Regular",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
};

export default defineConfig({
  site: config.siteUrl,
  base: config.baseUrl,
  trailingSlash: "never",
  output: "static",
  prefetch: {
    defaultStrategy: "hover",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  build: {
    assetsInlineLimit: 4096,
    cacheDir: "./.astro-cache",
    rollupOptions: {
      output: {
        crossOrigin: "anonymous",
      },
    },
  },
  integrations: [
    mdx(),
    sitemap(),
    playformInline({
      Logger: 0,
    }),
    purgecss(),
    compressor({
      gzip: true,
      brotli: true,
      zstd: true,
    }),
  ],
  vite: {
    plugins: [FontaineTransform.vite(fontaineOptions)],
  },
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      remarkGfm,
      remarkSlug,
      [
        remarkAutolinkHeadings,
        {
          behavior: "append",
          linkProperties: {
            class: "heading-anchor",
            "aria-label": "Permalink to this heading",
          },
        },
      ],
    ],
  },
});
