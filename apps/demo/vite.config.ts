import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "../../.leaf",
    rollupOptions: {
      input: "index.html",
    },
  },
  server: {
    open: true,
  },
});
