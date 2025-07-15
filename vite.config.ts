import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { cloudflare } from "@cloudflare/vite-plugin";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [vue(), vueDevTools() /*, cloudflare()*/],
});
