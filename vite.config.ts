import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import manifest from './manifest.json'

export default defineConfig({
  build: {
    outDir: 'mits'
  },
  plugins: [vue(), crx({ manifest })]
})
