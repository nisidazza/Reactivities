import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../API/wwwroot",
  },
  server: {
    port: 3000,
    https: true,
  },
  plugins: [react(), mkcert()],
});
