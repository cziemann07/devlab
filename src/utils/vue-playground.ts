import type { BindingMetadata, SFCDescriptor, SFCTemplateBlock } from '@vue/compiler-sfc'

/** Compila um App.vue; a execução acontece em um iframe isolado. */

const SFC_FILENAME = 'App.vue'
const COMPONENT_NAME = '__playground_component__'

const allowedScriptLanguages = new Set(['js', 'javascript', 'ts', 'typescript'])
const allowedStyleLanguages = new Set(['css', ''])

export interface PlaygroundBuild {
  code: string
  styles: string[]
}

interface CompilerIssue {
  message?: string
  loc?: { start?: { line?: number; column?: number } }
}

function describeIssue(issue: unknown): string {
  if (typeof issue === 'string') return issue
  const item = issue as CompilerIssue
  const message = item?.message ?? String(issue)
  const line = item?.loc?.start?.line
  const column = item?.loc?.start?.column
  return line ? `${SFC_FILENAME}:${line}:${column ?? 1} — ${message}` : message
}

function assertNoIssues(issues: readonly unknown[], title: string): void {
  if (!issues.length) return
  throw new Error(`${title}:\n${issues.map(describeIssue).join('\n')}`)
}

function checkImports(code: string): void {
  const specifiers = new Set<string>()
  const patterns = [
    /(?:^|\n)\s*import\s+(?:[^'"\n]*?\s+from\s+)?['"]([^'"]+)['"]/g,
    /(?:^|\n)\s*export\s+[^'"\n]*?\s+from\s+['"]([^'"]+)['"]/g,
  ]

  for (const pattern of patterns) {
    for (const match of code.matchAll(pattern)) specifiers.add(match[1])
  }

  const unsupported = [...specifiers].filter((specifier) => specifier !== 'vue')
  if (!unsupported.length) return

  const relative = unsupported.find(
    (specifier) => specifier.startsWith('.') || specifier.startsWith('/'),
  )
  if (relative) {
    throw new Error(
      'O playground executa um único arquivo App.vue. Imports de outros arquivos não estão disponíveis.',
    )
  }

  throw new Error(
    `Somente o pacote "vue" pode ser importado no playground. Não foi possível carregar: ${unsupported.join(', ')}.`,
  )
}

function validateDescriptor(descriptor: SFCDescriptor): void {
  const scripts = [descriptor.script, descriptor.scriptSetup].filter(
    (script): script is NonNullable<typeof script> => Boolean(script),
  )

  for (const script of scripts) {
    checkImports(script.content)
    if (script.src) {
      throw new Error('Atributos src em <script> não são suportados no playground.')
    }
    if (script.lang && !allowedScriptLanguages.has(script.lang)) {
      throw new Error(
        `A linguagem "${script.lang}" não é suportada no playground. Use JavaScript ou TypeScript.`,
      )
    }
  }

  if (descriptor.template) {
    if (descriptor.template.src) {
      throw new Error('Atributos src em <template> não são suportados no playground.')
    }
    if (descriptor.template.lang) {
      throw new Error(
        `A linguagem "${descriptor.template.lang}" não é suportada no playground. Use HTML.`,
      )
    }
  }

  for (const style of descriptor.styles) {
    if (style.src) {
      throw new Error('Atributos src em <style> não são suportados no playground.')
    }
    if (!allowedStyleLanguages.has(style.lang ?? '')) {
      throw new Error(
        `A linguagem "${style.lang}" não é suportada no playground. Use CSS puro.`,
      )
    }
    if (style.module) {
      throw new Error('CSS Modules não são suportados no playground. Remova o atributo module.')
    }
  }
}

function withRender(
  template: SFCTemplateBlock | null,
  bindings: BindingMetadata | undefined,
  compileTemplate: typeof import('@vue/compiler-sfc')['compileTemplate'],
  id: string,
  hasScoped: boolean,
  slotted: boolean,
): string {
  if (!template) return ''

  const compiled = compileTemplate({
    source: template.content,
    filename: SFC_FILENAME,
    id,
    scoped: hasScoped,
    slotted,
    compilerOptions: { bindingMetadata: bindings },
  })

  assertNoIssues(compiled.errors, 'Erro no template')

  return [
    ';',
    compiled.code.replace(/export\s+function\s+render\b/, 'function render'),
    `${COMPONENT_NAME}.render = render`,
    '',
  ].join('\n')
}

export async function buildPlayground(source: string): Promise<PlaygroundBuild> {
  if (!source.trim()) {
    throw new Error('Escreva algum código para executar.')
  }

  const [{ parse, compileScript, compileTemplate, compileStyle }, { transform }] =
    await Promise.all([import('@vue/compiler-sfc'), import('sucrase')])

  const id = Math.random().toString(36).slice(2, 10)
  const scopeId = `data-v-${id}`

  const { descriptor, errors } = parse(source, {
    filename: SFC_FILENAME,
    sourceMap: false,
  })
  assertNoIssues(errors, 'Não foi possível interpretar o componente')
  validateDescriptor(descriptor)

  if (!descriptor.template && !descriptor.script && !descriptor.scriptSetup) {
    throw new Error('Adicione ao menos um <template> ou um <script> ao componente.')
  }

  const hasScoped = descriptor.styles.some((style) => style.scoped)
  let moduleCode = ''

  if (descriptor.script || descriptor.scriptSetup) {
    const script = compileScript(descriptor, {
      id,
      genDefaultAs: COMPONENT_NAME,
      inlineTemplate: Boolean(descriptor.scriptSetup && descriptor.template),
      templateOptions: {
        scoped: hasScoped,
        slotted: descriptor.slotted,
      },
    })

    moduleCode = script.content

    if (!moduleCode.includes(COMPONENT_NAME)) {
      throw new Error(
        'O <script> precisa exportar o componente com export default (ou use <script setup>).',
      )
    }

    if (!descriptor.scriptSetup) {
      moduleCode += withRender(
        descriptor.template,
        script.bindings,
        compileTemplate,
        id,
        hasScoped,
        descriptor.slotted,
      )
    }
  } else {
    moduleCode = `const ${COMPONENT_NAME} = {};\n`
    moduleCode += withRender(
      descriptor.template,
      undefined,
      compileTemplate,
      id,
      hasScoped,
      descriptor.slotted,
    )
  }

  if (hasScoped) {
    moduleCode += `\n${COMPONENT_NAME}.__scopeId = ${JSON.stringify(scopeId)}`
  }

  moduleCode += `\nexport default ${COMPONENT_NAME}\n`

  const styles: string[] = []
  for (const style of descriptor.styles) {
    const compiled = compileStyle({
      source: style.content,
      filename: SFC_FILENAME,
      id: scopeId,
      scoped: style.scoped,
    })

    assertNoIssues(compiled.errors, 'Erro no CSS')
    if (compiled.code) styles.push(compiled.code)
  }

  // Remove os tipos (inclusive os gerados no render de <script setup lang="ts">).
  const { code } = transform(moduleCode, {
    transforms: ['typescript'],
    filePath: SFC_FILENAME,
  })

  checkImports(code)

  return { code, styles }
}
