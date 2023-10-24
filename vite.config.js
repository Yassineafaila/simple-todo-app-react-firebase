import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import env from "vite-plugin-env";
export default defineConfig({
  plugins: [react(), eslint()],
});



