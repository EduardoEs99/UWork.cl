import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Keep raster images cacheable and out of HTML, including hidden panels.
      assetsInlineLimit: (filePath) =>
        /\.(png|jpe?g|webp)$/i.test(filePath) ? false : undefined,
    },
  },
  devToolbar: { enabled: false },
});
