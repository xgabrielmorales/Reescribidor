import babel from "vite-plugin-babel";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    babel({
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              browsers: ["last 2 versions", "ie >= 11"],
            },
            modules: false,
          },
        ],
      ],
    }),
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json",
          dest: "",
        },
        {
          src: "src/static",
          dest: "",
        },
      ],
    }),
  ],
  build: {
    minify: true,
    rollupOptions: {
      input: {
        background: "src/background/background.js",
        content: "src/foreground/content.js",
      },
      output: {
        entryFileNames: "[name].js",
        dir: "dist",
      },
    },
  },
});
