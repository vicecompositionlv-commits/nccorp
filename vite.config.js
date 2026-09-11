import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function pagesBase() {
  const repo = process.env.GITHUB_REPOSITORY // "owner/name" in GitHub Actions
  if (!repo) return '/'
  const name = repo.split('/')[1]
  return name.endsWith('.github.io') ? '/' : `/${name}/`
}

export default defineConfig({
  plugins: [vue()],
  base: pagesBase(),
  test: {
    environment: 'jsdom',
  },
})
