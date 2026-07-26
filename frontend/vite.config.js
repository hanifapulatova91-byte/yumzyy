import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path resolution:
// - GitHub Pages build (default):  base = '/yumzyy/'  (site served from /yumzyy/)
// - Render / any host at root:     set VITE_BASE=/ in the build environment
// - Local dev:                     always '/'
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build'
    ? (process.env.VITE_BASE || '/yumzyy/')
    : '/',
}))
