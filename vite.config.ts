import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { devlabContent } from './build/content/plugin'

export default defineConfig({
  base: './',
  plugins: [vue(), devlabContent()],
})
