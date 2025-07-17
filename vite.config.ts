import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { cloudflare } from "@cloudflare/vite-plugin";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), vue(), vueDevTools() /*, cloudflare()*/],
});
