<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import VuatiCompanion from './VuatiCompanion.vue'
import { getCourse } from '../content'
import { useInventory } from '../composables/useInventory'
import {
  inventoryCategories,
  inventoryMaterials,
  inventoryFileLabel,
  inventoryTypeLabel,
  matchesInventoryCategory,
  type InventoryCategory,
} from '../utils/inventory'
import type { RenderedMaterial } from '../types/content'

const route = useRoute()
const { isInventoryOpen } = useInventory()
const dialog = ref<HTMLDialogElement>()
const heading = ref<HTMLElement>()
const category = ref<InventoryCategory>('todos')
const encounter = ref('todos')
const course = computed(() => getCourse(typeof route.params.slug === 'string' ? route.params.slug : undefined))
const materials = computed(() => course.value ? inventoryMaterials(course.value) : [])
const available = computed(() => materials.value.filter((item) => item.disponivel).length)
const meetings = computed(() => course.value?.encontros.filter((item) => item.tipo === 'encontro') ?? [])
const lessonMaterials = computed(() => materials.value.filter((item) =>
  encounter.value === 'todos' || (encounter.value === 'geral' ? !item.encontroId : item.encontroId === encounter.value),
))
const filtered = computed(() => lessonMaterials.value.filter((item) => matchesInventoryCategory(item, category.value)))
const theme = computed(() => ({
  '--primary': course.value?.curso.tema?.destaque ?? '#ece8df',
  '--primary-ink': course.value?.curso.tema?.tinta ?? '#0b0f14',
}))
let returnFocus: HTMLElement | null = null
let previousOverflow: string | undefined

function restorePage(): void {
  if (previousOverflow !== undefined) {
    document.documentElement.style.overflow = previousOverflow
    previousOverflow = undefined
  }
  if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true })
  returnFocus = null
}

function closed(): void {
  isInventoryOpen.value = false
  restorePage()
}

function close(): void {
  dialog.value?.close()
}

function backdropClick(event: MouseEvent): void {
  if (event.target !== dialog.value) return
  const rect = dialog.value.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close()
}

function trapFocus(event: KeyboardEvent): void {
  if (event.key !== 'Tab' || !dialog.value) return
  const controls = [...dialog.value.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], select:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )].filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0)
  const first = controls[0]
  const last = controls.at(-1)
  if (!first || !last) {
    event.preventDefault()
    heading.value?.focus()
    return
  }
  const active = document.activeElement
  if (event.shiftKey && (active === first || !controls.includes(active as HTMLElement))) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && (active === last || !controls.includes(active as HTMLElement))) {
    event.preventDefault()
    first.focus()
  }
}

function categoryCount(id: InventoryCategory): number {
  return lessonMaterials.value.filter((item) => matchesInventoryCategory(item, id)).length
}

function lessonLabel(item: RenderedMaterial): string {
  if (!item.encontroId) return 'Aula a confirmar'
  return `Aula ${Number(item.encontroId) || item.encontroId}`
}

watch(isInventoryOpen, (open) => {
  if (open && dialog.value && !dialog.value.open) {
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    category.value = 'todos'
    encounter.value = 'todos'
    previousOverflow = document.documentElement.style.overflow
    dialog.value.showModal()
    document.documentElement.style.overflow = 'hidden'
    heading.value?.focus({ preventScroll: true })
  } else if (!open && dialog.value?.open) {
    close()
  }
}, { flush: 'post' })

watch(() => route.fullPath, () => { isInventoryOpen.value = false })
onBeforeUnmount(() => {
  dialog.value?.close()
  isInventoryOpen.value = false
  restorePage()
})
</script>

<template>
  <Teleport to="body">
    <dialog
      id="inventario"
      ref="dialog"
      class="inventory course-theme"
      :style="theme"
      aria-labelledby="inventario-titulo"
      aria-describedby="inventario-descricao"
      @close="closed"
      @click="backdropClick"
      @keydown="trapFocus"
    >
      <div class="inventory-shell">
        <header class="inventory-header">
          <div class="inventory-identity">
            <span class="inventory-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 5V4a3 3 0 0 1 6 0v1M7 5h10a3 3 0 0 1 3 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a3 3 0 0 1 3-3Z"/><path d="M8 22v-7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7M9 9h6M4 11H2v7h2m16-7h2v7h-2"/></svg>
            </span>
            <div>
              <p class="inventory-eyebrow">DevLab · {{ course?.curso.titulo }}</p>
              <h2 id="inventario-titulo" ref="heading" tabindex="-1">Seu inventário</h2>
            </div>
          </div>
          <button class="inventory-close" type="button" aria-label="Fechar inventário" @click="close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
        </header>

        <div class="inventory-scroll">
          <section class="inventory-intro" aria-label="Materiais do minicurso">
            <div class="inventory-guide">
              <VuatiCompanion v-if="course?.curso.tema?.mascote" pose="pointing" class="inventory-vuati" />
              <p class="inventory-speech">Separe seu material.<br /><strong>Vamos colocar a mão no código!</strong></p>
            </div>
            <div class="inventory-summary">
              <p id="inventario-descricao">Apostilas e slides oficiais para acompanhar as unidades de cada encontro.</p>
              <p class="inventory-count"><span class="status-dot" /> {{ available }} disponíveis <template v-if="materials.length > available"><span class="count-divider">/</span> {{ materials.length - available }} aguardando envio</template></p>
            </div>
          </section>

          <div class="inventory-toolbar">
            <div class="inventory-filters" role="group" aria-label="Tipo de material">
              <button v-for="item in inventoryCategories.filter(item => categoryCount(item.id) > 0)" :key="item.id" type="button" :aria-pressed="category === item.id" @click="category = item.id">
                {{ item.label }} <span>{{ categoryCount(item.id) }}</span>
              </button>
            </div>
            <label class="inventory-lesson">
              <span class="sr-only">Filtrar por aula</span>
              <select v-model="encounter">
                <option value="todos">Todas as aulas</option>
                <option v-for="meeting in meetings" :key="meeting.id" :value="meeting.id">Aula {{ Number(meeting.id) || meeting.id }}</option>
                <option v-if="materials.some(item => !item.encontroId)" value="geral">Aula a confirmar</option>
              </select>
            </label>
          </div>

          <p class="inventory-result" role="status">{{ filtered.length }} {{ filtered.length === 1 ? 'material encontrado' : 'materiais encontrados' }}</p>
          <ul v-if="filtered.length" class="inventory-grid">
            <li v-for="item in filtered" :key="item.id" class="inventory-card" :class="{ 'is-pending': !item.disponivel }">
              <div class="inventory-card-top">
                <span class="file-icon" aria-hidden="true">{{ inventoryFileLabel(item) }}</span>
                <span class="inventory-state" :class="{ 'is-ready': item.disponivel }"><span class="status-dot" />{{ item.disponivel ? 'Disponível' : 'Aguardando envio' }}</span>
              </div>
              <p class="inventory-card-meta">{{ lessonLabel(item) }} <span>·</span> {{ inventoryTypeLabel(item.tipo) }}</p>
              <h3>{{ item.titulo }}</h3>
              <p class="inventory-card-description">{{ item.descricao }}</p>
              <div class="inventory-card-bottom">
                <span v-if="item.demonstrativo" class="inventory-origin">Preliminar</span>
                <span v-else-if="item.disponivel" class="inventory-origin">Material recebido</span>
                <div v-if="item.disponivel" class="inventory-actions">
                  <a v-if="item.href" :href="item.href" target="_blank" rel="noopener noreferrer" :aria-label="`Abrir ${item.titulo} em nova aba`">Abrir ↗</a>
                  <a v-if="item.downloadHref" class="inventory-download" :href="item.downloadHref" download :aria-label="`Baixar ${item.titulo}`">Baixar <span aria-hidden="true">↓</span></a>
                </div>
                <span v-else class="inventory-pending-note">Disponível aqui quando enviado.</span>
              </div>
            </li>
          </ul>
          <div v-else class="inventory-empty">
            <VuatiCompanion v-if="course?.curso.tema?.mascote" pose="thinking" size="sm" />
            <h3>Nenhum material com esses filtros</h3>
            <p>Experimente outra aula ou veja todos os materiais.</p>
            <button type="button" class="btn btn-sm" @click="category = 'todos'; encounter = 'todos'">Limpar filtros</button>
          </div>
          <p class="inventory-footnote">Os PDFs oficiais foram preservados. Consulte as unidades dos encontros para estudar e abrir os códigos iniciais de cada missão.</p>
        </div>
        <footer class="inventory-footer"><span>Seu ponto de apoio antes, durante e depois da aula.</span><button type="button" @click="close"><span aria-hidden="true">←</span> Voltar ao curso</button></footer>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.inventory { width: min(1080px, calc(100vw - 48px)); max-width: none; max-height: min(900px, calc(100dvh - 48px)); padding: 0; border: 1px solid var(--border-strong); border-radius: 20px; background: var(--bg); color: var(--text); box-shadow: 0 32px 120px #0009; overflow: hidden; }
.inventory::backdrop { background: rgb(3 7 12 / 78%); backdrop-filter: blur(8px); }
.inventory-shell { display: flex; flex-direction: column; max-height: min(900px, calc(100dvh - 50px)); }
.inventory-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 24px 32px; border-bottom: 1px solid var(--border); }
.inventory-identity { display: flex; align-items: center; gap: 14px; min-width: 0; }
.inventory-mark { display: grid; place-items: center; width: 48px; height: 48px; border: 1px solid var(--primary-line); border-radius: 13px; background: var(--primary-soft); color: var(--primary); flex: none; }
.inventory-mark svg { width: 27px; height: 27px; }
.inventory-eyebrow { margin: 0 0 4px; color: var(--text-2); font-size: .72rem; font-family: var(--font-mono); }
.inventory h2 { margin: 0; font-size: 1.65rem; letter-spacing: -.04em; }
.inventory h2:focus { outline: none; }
.inventory-close { display: grid; place-items: center; width: 36px; height: 36px; padding: 7px; border: 1px solid var(--border); border-radius: 9px; background: var(--surface); color: var(--text-2); cursor: pointer; flex: none; }
.inventory-close:hover { background: var(--surface-2); color: var(--text); }
.inventory-close svg { width: 21px; height: 21px; }
.inventory-scroll { overflow-y: auto; overscroll-behavior: contain; padding: 0 32px 24px; }
.inventory-intro { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: center; margin-bottom: 24px; padding: 24px 0; border-bottom: 1px solid var(--border); }
.inventory-guide { display: flex; align-items: center; gap: 8px; min-width: 0; }
.inventory-vuati { --vuati-h: 128px; }
.inventory-speech { position: relative; margin: 0; padding: 14px 16px; border: 1px solid var(--primary-line); border-radius: 12px 12px 12px 3px; background: var(--primary-soft); font-size: .82rem; line-height: 1.7; }
.inventory-speech strong { font-weight: 550; }
.inventory-summary > p { margin: 0; font-size: .9rem; color: var(--text-2); line-height: 1.7; }
.inventory-summary .inventory-count { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 12px; font-size: .72rem; font-family: var(--font-mono); color: var(--text); }
.status-dot { width: 5px; height: 5px; display: inline-block; border-radius: 50%; background: currentColor; flex: none; }
.inventory-count > .status-dot { color: var(--primary); }
.count-divider { margin: 0 3px; color: var(--border-strong); }
.inventory-toolbar { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; justify-content: space-between; }
.inventory-filters { display: flex; flex-wrap: wrap; gap: 5px; }
.inventory-filters button { display: flex; gap: 7px; align-items: center; padding: 8px 10px; border: 1px solid transparent; border-radius: 8px; background: transparent; color: var(--text-2); font: inherit; font-size: .76rem; cursor: pointer; }
.inventory-filters button:hover { color: var(--text); background: var(--surface); }
.inventory-filters button[aria-pressed='true'] { color: var(--primary); background: var(--primary-soft); border-color: var(--primary-line); }
.inventory-filters button span { font-family: var(--font-mono); font-size: .65rem; opacity: .75; }
.inventory-lesson select { padding: 9px 28px 9px 12px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text); font: inherit; font-size: .76rem; }
.inventory-result { margin: 20px 0 12px; font-size: .72rem; color: var(--text-2); }
.inventory-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; padding: 0; margin: 0; list-style: none; }
.inventory-card { display: flex; flex-direction: column; padding: 20px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); }
.inventory-card:hover { border-color: var(--border-strong); }
.inventory-card.is-pending { background: color-mix(in srgb, var(--surface) 45%, var(--bg)); border-style: dashed; }
.inventory-card-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.file-icon { display: grid; place-items: center; width: 38px; height: 42px; border: 1px solid var(--border-strong); border-radius: 6px 11px 6px 6px; color: var(--text-2); font-family: var(--font-mono); font-size: .65rem; }
.inventory-state { display: flex; gap: 6px; align-items: center; color: var(--text-2); font-size: .66rem; }
.inventory-state.is-ready { color: var(--primary); }
.inventory-card-meta { display: flex; gap: 7px; margin: 0 0 8px; color: var(--text-2); font-size: .66rem; font-family: var(--font-mono); }
.inventory-card h3 { margin: 0 0 9px; font-size: .98rem; line-height: 1.5; letter-spacing: -.02em; }
.inventory-card-description { margin: 0 0 20px; color: var(--text-2); font-size: .79rem; line-height: 1.7; }
.inventory-card-bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 15px; border-top: 1px solid var(--border); }
.inventory-origin, .inventory-pending-note { color: var(--text-2); font-size: .66rem; }
.inventory-actions { display: flex; gap: 12px; align-items: center; margin-left: auto; }
.inventory-actions a { color: var(--text-2); text-decoration: none; font-size: .74rem; }
.inventory-actions a:hover { color: var(--text); }
.inventory-actions .inventory-download { display: flex; gap: 14px; align-items: center; color: var(--primary); }
.inventory-empty { display: grid; justify-items: center; padding: 32px 16px; border: 1px dashed var(--border); border-radius: 12px; text-align: center; }
.inventory-empty h3 { margin: 12px 0 4px; font-size: 1rem; }
.inventory-empty p { margin: 0 0 16px; color: var(--text-2); font-size: .85rem; }
.inventory-footnote { margin: 20px 0 0; color: var(--text-2); font-size: .71rem; line-height: 1.7; }
.inventory-footer { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 16px 32px; border-top: 1px solid var(--border); background: var(--surface); color: var(--text-2); font-size: .7rem; }
.inventory-footer button { border: 0; padding: 4px 0; background: transparent; color: var(--text); font: inherit; cursor: pointer; white-space: nowrap; }
@media (max-width: 760px) {
  .inventory { width: calc(100vw - 24px); max-height: calc(100dvh - 24px); border-radius: 15px; }
  .inventory-shell { max-height: calc(100dvh - 26px); }
  .inventory-header { padding: 18px 20px; }
  .inventory-scroll { padding: 0 20px 20px; }
  .inventory-intro { grid-template-columns: 1fr; gap: 8px; padding-block: 16px; }
  .inventory-vuati { --vuati-h: 105px; }
  .inventory-summary { padding-top: 8px; }
  .inventory-footer { padding: 14px 20px; }
  .inventory-footer > span { display: none; }
  .inventory-footer button { margin-left: auto; }
}
@media (max-width: 540px) {
  .inventory-grid { grid-template-columns: 1fr; }
  .inventory h2 { font-size: 1.35rem; }
  .inventory-eyebrow { font-size: .6rem; }
  .inventory-mark { width: 40px; height: 40px; }
  .inventory-header { gap: 8px; }
  .inventory-guide { gap: 0; }
  .inventory-speech { padding: 10px 12px; font-size: .74rem; }
  .inventory-filters button { padding: 8px; }
}
</style>
