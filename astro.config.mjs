import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  redirects: {
    "/iniciar-sesion": "/login",
    "/registro": "/register",
    "/estudiantes": "/students",
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: (filePath) =>
        /\.(png|jpe?g|webp)$/i.test(filePath) ? false : undefined,
    },
  },
  devToolbar: { enabled: false },
});
