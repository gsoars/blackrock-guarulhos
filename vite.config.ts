import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/blackrock-guarulhos/", // NOME EXATO DO REPO
});
