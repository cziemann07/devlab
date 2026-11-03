import MarkdownIt from 'markdown-it'
import { createHighlighter, type BundledLanguage, type Highlighter } from 'shiki'
import type { LinguagemCodigo } from '../../src/types/content'

const THEME = 'github-dark-default'
const LANGUAGES: LinguagemCodigo[] = ['vue', 'ts', 'js', 'html', 'css', 'bash', 'json']

const LANGUAGE_ALIASES: Record<string, LinguagemCodigo> = {
  vue: 'vue',
  ts: 'ts',
  typescript: 'ts',
  js: 'js',
  javascript: 'js',
  html: 'html',
  css: 'css',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  json: 'json',
}

export interface Renderer {
  markdown: (source: string) => string
  inlineMarkdown: (source: string) => string
  code: (source: string, language: LinguagemCodigo) => string
}

const highlighterPromise: Promise<Highlighter> = createHighlighter({
  themes: [THEME],
  langs: LANGUAGES as BundledLanguage[],
})

function normalizeLanguage(info: string): LinguagemCodigo | undefined {
  const language = info.trim().split(/\s+/)[0]?.toLowerCase()
  return language ? LANGUAGE_ALIASES[language] : undefined
}

export async function createRenderer(): Promise<Renderer> {
  const highlighter = await highlighterPromise

  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: false,
  })

  md.renderer.rules.fence = (tokens, index) => {
    const token = tokens[index]
    const language = normalizeLanguage(token.info)
    const source = token.content.replace(/\n$/, '')
    if (language) {
      return highlighter.codeToHtml(source, { lang: language, theme: THEME })
    }
    return `<pre class="shiki-fallback"><code>${md.utils.escapeHtml(source)}</code></pre>`
  }

  md.renderer.rules.link_open = (tokens, index, options, _env, self) => {
    const token = tokens[index]
    const href = token.attrGet('href') ?? ''
    if (/^https?:\/\//.test(href)) {
      token.attrSet('target', '_blank')
      token.attrSet('rel', 'noopener noreferrer')
    }
    return self.renderToken(tokens, index, options)
  }

  return {
    markdown: (source) => md.render(source),
    inlineMarkdown: (source) => md.renderInline(source),
    code: (source, language) => highlighter.codeToHtml(source, { lang: language, theme: THEME }),
  }
}
