import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Plugin que atualiza version.json automaticamente a cada build
function autoVersionPlugin() {
  return {
    name: 'auto-version',
    buildStart() {
      const versionPath = path.resolve(__dirname, 'public/version.json')
      const now = new Date().toISOString()
      
      // Gera versão baseada em timestamp para garantir unicidade
      const d = new Date()
      const version = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}-${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
      
      const content = JSON.stringify({ version, buildTime: now }, null, 2) + '\n'
      fs.writeFileSync(versionPath, content, 'utf-8')
      console.log(`\n🔄 [AutoVersion] version.json atualizado → v${version}\n`)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), autoVersionPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.js',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
})
