import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: ".leaf",
    rollupOptions: {
      input: "public/index.html",
    },
  },
  server: {
    open: true,
  },
});
