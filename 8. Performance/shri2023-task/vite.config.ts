import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [splitVendorChunkPlugin(), react()],
  base: 'https://kseniayurko.github.io/shri2023-task/',
  build: {
		outDir: "docs",
	},
})
