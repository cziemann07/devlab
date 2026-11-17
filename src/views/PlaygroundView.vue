<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  version,
  watch,
} from 'vue'
import { useRoute } from 'vue-router'
import { previewDocument } from '../utils/playground-preview'
import Badge from '../components/Badge.vue'
import {
  playgroundExamples,
} from '../content/playground-examples'
import { buildPlayground } from '../utils/vue-playground'

const route = useRoute()
const initial = playgroundExamples.find(item => item.id === route.query.exemplo) ?? playgroundExamples[0]
const selectedExampleId = ref(initial.id)
const source = ref(initial.code)
const editor = ref<HTMLTextAreaElement>()
const gutter = ref<HTMLElement>()
const previewFrame = ref<HTMLIFrameElement>()
const previewHtml = ref('')

const status = ref<'idle' | 'running' | 'ok' | 'error'>('idle')
const errorMessage = ref('')
const hasPreview = ref(false)
const tabReleased = ref(false)

const lineCount = computed(() => source.value.split('\n').length)
const lineNumbers = computed(() =>
  Array.from({ length: lineCount.value }, (_, index) => index + 1).join('\n'),
)

const statusLabel = computed(() => {
  if (status.value === 'running') return 'Compilando e atualizando a prévia…'
  if (status.value === 'ok') return 'Prévia atualizada'
  if (status.value === 'error') return 'Erro no código'
  return 'Pronto para executar'
})

let debounceTimer: ReturnType<typeof setTimeout> | undefined
let runToken = 0

function textOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function receivePreview(event: MessageEvent): void {
  if (event.source !== previewFrame.value?.contentWindow) return
  const data = event.data
  if (!data || data.channel !== 'devlab-preview' || data.token !== runToken) return
  if (data.type === 'ready') {
    status.value = 'ok'
    hasPreview.value = true
  } else if (data.type === 'error') {
    status.value = 'error'
    errorMessage.value = `Erro em tempo de execução: ${String(data.message)}`
  }
}

async function runPlayground(): Promise<void> {
  const token = ++runToken
  status.value = 'running'
  errorMessage.value = ''

  try {
    const build = await buildPlayground(source.value)
    if (token !== runToken) return

    hasPreview.value = false
    previewHtml.value = previewDocument(build, token)
  } catch (error) {
    if (token !== runToken) return
    status.value = 'error'
    errorMessage.value = textOf(error)
  }
}

function scheduleRun(): void {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debounceTimer = undefined
    void runPlayground()
  }, 750)
}

function runNow(): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = undefined
  }
  void runPlayground()
}

function changeExample(event: Event): void {
  const id = (event.target as HTMLSelectElement).value
  const example = playgroundExamples.find((item) => item.id === id)
  if (!example) return

  selectedExampleId.value = example.id
  source.value = example.code
}

function restoreExample(): void {
  const example = playgroundExamples.find((item) => item.id === selectedExampleId.value)
  if (!example) return

  source.value = example.code
  editor.value?.focus()
}

function syncScroll(event: Event): void {
  const textarea = event.target as HTMLTextAreaElement
  if (gutter.value) gutter.value.scrollTop = textarea.scrollTop
}

function onEditorKeydown(event: KeyboardEvent): void {
  const textarea = event.target as HTMLTextAreaElement

  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault()
    runNow()
    return
  }

  // O Tab indenta o código. Esc libera o foco para quem navega por teclado.
  if (event.key === 'Escape') {
    tabReleased.value = true
    return
  }

  if (event.key !== 'Tab') {
    if (tabReleased.value) tabReleased.value = false
    return
  }

  if (tabReleased.value) {
    tabReleased.value = false
    return
  }

  event.preventDefault()

  const start = textarea.selectionStart
  const end = textarea.selectionEnd

  if (event.shiftKey) {
    const lineStart = textarea.value.lastIndexOf('\n', start - 1) + 1
    const before = textarea.value.slice(lineStart, start)
    const remove = before.endsWith('  ') ? 2 : before.endsWith(' ') ? 1 : 0
    if (!remove) return

    source.value = textarea.value.slice(0, start - remove) + textarea.value.slice(end)
    void nextTick(() => {
      textarea.selectionStart = textarea.selectionEnd = start - remove
    })
    return
  }

  source.value = textarea.value.slice(0, start) + '  ' + textarea.value.slice(end)
  void nextTick(() => {
    textarea.selectionStart = textarea.selectionEnd = start + 2
  })
}

watch(source, scheduleRun)

watch(() => route.query.exemplo, id => {
  const example = playgroundExamples.find(item => item.id === id)
  if (example) { selectedExampleId.value = example.id; source.value = example.code }
})

onMounted(() => {
  window.addEventListener('message', receivePreview)
  void runPlayground()
})

onBeforeUnmount(() => {
  runToken++
  if (debounceTimer) clearTimeout(debounceTimer)
  window.removeEventListener('message', receivePreview)
})
</script>

<template>
  <section class="playground">
    <div class="container">
      <header class="playground-head">
        <div>
          <p class="eyebrow">Playground</p>
          <h1>Vue.js no navegador</h1>
          <p class="lead">
            Edite um componente <code>App.vue</code>, use reatividade e veja o resultado na hora.
            Os exemplos são adaptações didáticas dos materiais. O código executa em uma prévia isolada no navegador.
          </p>
        </div>
        <div class="head-meta">
          <Badge variant="primary">Vue {{ version }}</Badge>
          <Badge>um único arquivo</Badge>
        </div>
      </header>

      <div class="toolbar">
        <label class="toolbar-select">
          <span>Exemplo</span>
          <select aria-label="Exemplo" :value="selectedExampleId" @change="changeExample">
            <option v-for="example in playgroundExamples" :key="example.id" :value="example.id">
              {{ example.label }}
            </option>
          </select>
        </label>

        <div class="toolbar-actions">
          <button class="btn btn-sm" type="button" @click="restoreExample">
            Restaurar exemplo
          </button>
          <button class="btn btn-primary btn-sm" type="button" @click="runNow">
            Executar
            <kbd>Ctrl ↵</kbd>
          </button>
        </div>
      </div>

      <div class="status-row">
        <p class="status" role="status" aria-live="polite">
          <span class="status-dot" :data-state="status" aria-hidden="true" />
          {{ statusLabel }}
        </p>
        <p class="status-hint">A prévia também atualiza sozinha enquanto você digita.</p>
      </div>

      <div v-if="errorMessage" class="error" role="alert">
        <strong>Não foi possível executar</strong>
        <pre>{{ errorMessage }}</pre>
        <p v-if="hasPreview" class="error-hint">
          A prévia abaixo mantém a última execução válida.
        </p>
      </div>

      <div class="workspace">
        <section class="pane" aria-labelledby="playground-editor-title">
          <header class="pane-head">
            <h2 id="playground-editor-title">App.vue</h2>
            <span class="pane-meta">{{ lineCount }} linhas</span>
          </header>

          <div class="editor">
            <pre ref="gutter" class="gutter" aria-hidden="true">{{ lineNumbers }}</pre>
            <textarea
              ref="editor"
              v-model="source"
              class="editor-input"
              aria-label="Código do componente App.vue"
              spellcheck="false"
              autocapitalize="off"
              autocomplete="off"
              wrap="off"
              @keydown="onEditorKeydown"
              @scroll="syncScroll"
              @blur="tabReleased = false"
            />
          </div>
        </section>

        <section class="pane preview-pane" aria-labelledby="playground-preview-title">
          <header class="pane-head">
            <h2 id="playground-preview-title">Prévia</h2>
            <span class="pane-meta">estilos isolados</span>
          </header>

          <iframe ref="previewFrame" class="preview" title="Prévia do componente Vue" sandbox="allow-scripts allow-forms" :srcdoc="previewHtml" />
        </section>
      </div>

      <aside class="notes" aria-labelledby="playground-notes-title">
        <h2 id="playground-notes-title">Como usar</h2>
        <ul>
          <li>
            O editor contém um único <code>App.vue</code>, com
            <code>&lt;script setup&gt;</code>, <code>&lt;template&gt;</code> e
            <code>&lt;style&gt;</code>.
          </li>
          <li>
            Imports do pacote <code>vue</code> funcionam normalmente. Outros pacotes e
            arquivos externos não são carregados.
          </li>
          <li>
            <kbd>Ctrl</kbd> + <kbd>Enter</kbd> (ou <kbd>⌘</kbd> + <kbd>Enter</kbd>) executa
            na hora. A prévia também atualiza alguns instantes depois de cada edição.
          </li>
          <li>
            <kbd>Tab</kbd> indenta o código. Para sair do editor pelo teclado, pressione
            <kbd>Esc</kbd> e depois <kbd>Tab</kbd>.
          </li>
          <li>
            O playground aceita JavaScript, TypeScript e CSS:
            os tipos são removidos antes da execução. A prévia não acessa a página ou o armazenamento do DevLab. Use o projeto local para Router, múltiplos arquivos e diálogos do navegador.
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.playground {
  padding-block: 3.5rem 4.5rem;
}

.playground-head {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem;
}

.playground-head .lead {
  max-width: 68ch;
}

.playground-head code,
.notes code {
  padding: 0.08rem 0.34rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--surface-2);
  font-size: 0.88em;
}

.head-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.toolbar-select {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-2);
  font-size: 0.85rem;
}

.toolbar-select select {
  padding: 0.45rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
}

.toolbar-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

kbd {
  padding: 0.05rem 0.3rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface-2);
  color: inherit;
  font-family: var(--font-mono);
  font-size: 0.72em;
  line-height: 1.4;
}

.btn-primary kbd {
  border-color: color-mix(in srgb, var(--primary-ink) 25%, transparent);
  background: color-mix(in srgb, var(--primary-ink) 12%, transparent);
}

.status-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 1rem 0;
  color: var(--text-2);
  font-size: 0.83rem;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  color: var(--text);
}

.status-hint {
  margin: 0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-2);
}

.status-dot[data-state='running'] {
  background: var(--warn);
  animation: pulse 1s ease-in-out infinite;
}

.status-dot[data-state='ok'] {
  background: var(--primary);
}

.status-dot[data-state='error'] {
  background: var(--danger);
}

@keyframes pulse {
  50% {
    opacity: 0.35;
  }
}

.error {
  margin-bottom: 1rem;
  padding: 0.9rem 1rem;
  border: 1px solid color-mix(in srgb, var(--danger) 40%, transparent);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--danger) 10%, transparent);
  color: var(--danger);
}

.error strong {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.9rem;
}

.error pre {
  max-height: 16rem;
  margin: 0;
  overflow: auto;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.55;
  white-space: pre-wrap;
}

.error-hint {
  margin: 0.55rem 0 0;
  color: var(--text-2);
  font-size: 0.8rem;
}

.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 1rem;
}

.pane {
  display: flex;
  flex-direction: column;
  height: clamp(460px, 62vh, 720px);
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--code-bg);
}

.pane-head {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.pane-head h2 {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0;
}

.pane-meta {
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.editor {
  display: flex;
  flex: 1;
  min-height: 0;
}

.gutter {
  flex: none;
  width: 3.4rem;
  margin: 0;
  padding: 1rem 0.55rem 1rem 0.75rem;
  overflow: hidden;
  border-right: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.86rem;
  line-height: 1.7;
  text-align: right;
  user-select: none;
}

.editor-input {
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 1rem;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.86rem;
  line-height: 1.7;
  tab-size: 2;
  resize: none;
  white-space: pre;
}

.editor-input:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}

.preview {
  width: 100%;
  border: 0;
  flex: 1;
  min-height: 0;
  overflow: auto;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, var(--primary-glow), transparent 70%),
    var(--code-bg);
}

.notes {
  margin-top: 2rem;
  padding: 1.25rem 1.4rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.notes h2 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}

.notes ul {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding-left: 1.15rem;
  color: var(--text-2);
  font-size: 0.9rem;
}

.notes li::marker {
  color: var(--primary);
}

.notes kbd {
  font-size: 0.7rem;
}

@media (max-width: 900px) {
  .workspace {
    grid-template-columns: minmax(0, 1fr);
  }

  .pane {
    height: clamp(400px, 56vh, 600px);
  }
}

@media (max-width: 560px) {
  .playground {
    padding-block: 2.5rem 3.5rem;
  }

  .toolbar-select {
    width: 100%;
    justify-content: space-between;
  }

  .toolbar-select select {
    flex: 1;
    min-width: 0;
  }

  .toolbar-actions {
    width: 100%;
    justify-content: space-between;
  }

  .status-hint {
    display: none;
  }

  .pane {
    height: 420px;
  }

  .gutter {
    width: 2.9rem;
    font-size: 0.8rem;
  }

  .editor-input {
    padding: 0.85rem;
    font-size: 0.8rem;
  }
}
</style>
