import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        wishlist: resolve(__dirname, "src/wishlist/index.html"),
        product: resolve(__dirname, "src/game_pages/index.html"),
        listing: resolve(__dirname, "src/game-listing/index.html"),
      },
    },
  },
});
