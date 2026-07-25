import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed at https://hanifapulatova91-byte.github.io/yumzyy/
// Local dev keeps base="/" so http://localhost:5173/ still works.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/yumzyy/' : '/',
}))
