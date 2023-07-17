import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  // resolve:{
  //   alias:{
  //     '@': path.resolve(__dirname,)
  //   },
  // },
  plugins: [splitVendorChunkPlugin(), react()],
  base: '/shri-task-3/',
})
