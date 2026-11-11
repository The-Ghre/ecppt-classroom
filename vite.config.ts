/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages project site. Override with BASE_PATH env if needed.
const base = process.env.BASE_PATH ?? '/ecppt-classroom/'

export default defineConfig({
  base,
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false, chunkSizeWarningLimit: 1200 },
})
