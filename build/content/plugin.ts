import { resolve } from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'
import { courses, site } from '../../content'
import type { SiteData } from '../../src/types/content'
import { renderContent } from './availability'
import { validateContent } from './validate'

const VIRTUAL_ID = 'virtual:devlab-content'
const RESOLVED_ID = '\0virtual:devlab-content'

export function devlabContent(): Plugin {
  const contentRoot = resolve(process.cwd(), 'content')
  const publicRoot = resolve(process.cwd(), 'public')
  let cache: Promise<SiteData> | undefined

  const getData = () => {
    if (!cache) {
      cache = (async () => {
        const result = validateContent(site, courses, contentRoot, publicRoot)
        for (const warning of result.warnings) {
          console.warn(warning)
        }
        if (result.errors.length > 0) {
          throw new Error(
            `Conteúdo inválido — ${result.errors.length} erro(s):\n\n${result.errors.join('\n\n')}`,
          )
        }
        return renderContent(site, courses, contentRoot)
      })()
    }
    return cache
  }

  const watchContent = (server: ViteDevServer) => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const scheduleRestart = (file: string) => {
      const normalized = file.replace(/\\/g, '/')
      if (!normalized.startsWith(contentRoot.replace(/\\/g, '/'))) return
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = undefined
        server.restart()
      }, 120)
    }

    server.watcher.add(contentRoot)
    server.watcher.on('add', scheduleRestart)
    server.watcher.on('change', scheduleRestart)
    server.watcher.on('unlink', scheduleRestart)
  }

  return {
    name: 'devlab-content',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      return null
    },
    async load(id) {
      if (id !== RESOLVED_ID) return null
      const data = await getData()
      return `export default ${JSON.stringify(data)}`
    },
    configureServer: watchContent,
  }
}
