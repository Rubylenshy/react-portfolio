import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // The SSR build (src/entry-server.jsx, used only by scripts/prerender.mjs at build time)
  // bundles its dependencies so Node doesn't have to resolve their ESM/CSS entry points.
  ssr: {
    noExternal: true,
  },
})
