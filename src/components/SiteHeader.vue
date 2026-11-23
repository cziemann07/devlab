<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getCourse, coursePath } from '../content'
import { useSectionNav } from '../composables/useSectionNav'
import { useInventory } from '../composables/useInventory'

const course = getCourse()
const repositoryUrl = computed(() => course?.curso.repositorioUrl)
const courseTitle = computed(() => course?.curso.titulo)

const { goHomeSection } = useSectionNav()
const { isInventoryOpen, openInventory } = useInventory()
const route = useRoute()
const scheduleOpen = ref(false)
const scheduleButton = ref<HTMLButtonElement>()
const scheduleMenu = ref<HTMLElement>()
const schedulePosition = ref({ left: '0px', top: '0px' })
function positionSchedule() {
  if (!scheduleOpen.value || !scheduleButton.value || !scheduleMenu.value) return
  const trigger = scheduleButton.value.getBoundingClientRect()
  const width = scheduleMenu.value.getBoundingClientRect().width
  schedulePosition.value = {
    left: `${Math.max(8, Math.min(trigger.left, window.innerWidth - width - 8))}px`,
    top: `${trigger.bottom + 8}px`,
  }
}
watch(scheduleOpen, async open => { if (open) { await nextTick(); positionSchedule() } })
function closeSchedule(event: PointerEvent) {
  const target = event.target as Node
  if (!scheduleMenu.value?.contains(target) && !scheduleButton.value?.contains(target)) scheduleOpen.value = false
}
function escapeSchedule(event: KeyboardEvent) {
  if (event.key === 'Escape' && scheduleOpen.value) {
    scheduleOpen.value = false
    scheduleButton.value?.focus()
  }
}
watch(() => route.fullPath, () => { scheduleOpen.value = false })
onMounted(() => { document.addEventListener('pointerdown', closeSchedule); document.addEventListener('keydown', escapeSchedule); window.addEventListener('resize', positionSchedule); document.addEventListener('scroll', positionSchedule, true) })
onBeforeUnmount(() => { document.removeEventListener('pointerdown', closeSchedule); document.removeEventListener('keydown', escapeSchedule); window.removeEventListener('resize', positionSchedule); document.removeEventListener('scroll', positionSchedule, true) })
</script>

<template>
  <header class="site-header">
    <div class="container">
      <RouterLink class="brand" to="/">
        <span class="brand-mark" aria-hidden="true">&lt;/&gt;</span>
        <span class="brand-name">DevLab</span>
        <span v-if="courseTitle" class="brand-course">
          <span class="sr-only">, minicurso</span>
          {{ courseTitle }}
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="Principal">
        <button ref="scheduleButton" class="nav-link" type="button" :aria-expanded="scheduleOpen" aria-controls="cronograma-menu" @click="scheduleOpen = !scheduleOpen">Cronograma <span class="schedule-chevron" aria-hidden="true">⌄</span></button>
        <nav v-if="scheduleOpen && course" id="cronograma-menu" ref="scheduleMenu" class="schedule-menu" :style="schedulePosition" aria-label="Etapas do minicurso">
          <RouterLink v-for="stage in course.encontros" :key="stage.id" :to="coursePath(course, 'encontros', stage.id)" @click="scheduleOpen = false"><span class="schedule-icon" aria-hidden="true">{{ stage.tipo === 'preparacao' ? '⌘' : stage.id === '01' ? '◇' : '✓' }}</span>
            <span>{{ stage.tipo === 'preparacao' ? 'Preparação' : `Aula ${stage.id}` }}</span>
            <span class="schedule-arrow" aria-hidden="true">→</span></RouterLink>
        </nav>
        <RouterLink v-if="course" class="nav-link" :to="`/cursos/${course.curso.slug}/atividades`">Atividades</RouterLink>
        <button class="nav-link" type="button" @click="goHomeSection('recursos')">
          Recursos
        </button>
        <RouterLink class="nav-link" active-class="is-active" to="/playground">
          Playground
        </RouterLink>

        <a
          v-if="repositoryUrl"
          class="nav-link nav-link--external"
          :href="repositoryUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </nav>
        <button class="nav-link nav-inventory" type="button" aria-haspopup="dialog" aria-controls="inventario" aria-label="Abrir inventário de materiais" :aria-expanded="isInventoryOpen" @click="openInventory">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9 5V4a3 3 0 0 1 6 0v1M7 5h10a3 3 0 0 1 3 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a3 3 0 0 1 3-3Z"/><path d="M8 22v-7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7M9 9h6"/></svg>
          <span class="nav-inventory-label">Inventário</span>
        </button>
    </div>
  </header>
</template>

<style scoped>
.schedule-menu { position: fixed; z-index: 60; display: grid; min-width: 200px; max-width: calc(100vw - 2rem); padding: .4rem; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); box-shadow: 0 12px 30px #0005; }
.schedule-menu a { padding: .8rem 1rem; color: var(--text); text-decoration: none; border-radius: var(--radius-sm); }
.schedule-menu { border-top: 2px solid var(--primary); animation: schedule-in .18s ease-out; }
.schedule-menu a { display: grid; grid-template-columns: 1.9rem 1fr auto; align-items: center; gap: .6rem; padding: .55rem .65rem; }
.schedule-menu a:hover, .schedule-menu a:focus-visible, .schedule-menu a.router-link-exact-active { background: var(--surface-2); }
.schedule-icon { display: grid; place-items: center; aspect-ratio: 1; border: 1px solid var(--border); border-radius: .45rem; color: var(--primary); background: var(--bg); }
.schedule-arrow, .schedule-chevron { display: inline-block; color: var(--primary); transition: transform .18s ease; }
.schedule-menu a:hover .schedule-arrow, .schedule-menu a:focus-visible .schedule-arrow { transform: translateX(3px); }
[aria-expanded='true'] > .schedule-chevron { transform: rotate(180deg); }
@keyframes schedule-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .schedule-menu { animation: none; }
  .schedule-arrow, .schedule-chevron { transition: none; }
}
.site-nav { min-width: 0; }
.nav-inventory { flex: none; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--border);
  background: rgba(11, 15, 20, 0.88);
  backdrop-filter: saturate(140%) blur(8px);
}

.container {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  height: var(--header-height);
}

.brand {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.55rem;
  color: var(--text);
  font-weight: 700;
  letter-spacing: -0.01em;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--surface-2);
  color: var(--brand);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.brand-course {
  padding-left: 0.65rem;
  border-left: 1px solid var(--border);
  color: var(--text-2);
  font-size: 0.86rem;
  font-weight: 500;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  margin-left: auto;
  overflow-x: auto;
  scrollbar-width: none;
}

.site-nav::-webkit-scrollbar {
  display: none;
}

.nav-link {
  padding: 0.4rem 0.65rem;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-2);
  font-size: 0.88rem;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    color 0.15s var(--ease),
    background 0.15s var(--ease);
}

.nav-link:hover {
  background: var(--surface);
  color: var(--text);
}

.nav-link.is-active {
  background: var(--surface-2);
  color: var(--text);
}

.nav-inventory { display: inline-flex; align-items: center; gap: 6px; }
.nav-inventory svg { width: 16px; height: 16px; flex: none; }
.nav-inventory[aria-expanded='true'] { color: var(--text); background: var(--surface-2); }

/* .site-nav rola no eixo x e cortaria um contorno externo. */
.nav-link:focus-visible {
  outline-offset: -2px;
  border-radius: var(--radius-sm);
}

@media (max-width: 720px) {
  .container {
    gap: 0.65rem;
  }

  .brand-course {
    display: none;
  }

  .nav-link {
    padding: 0.35rem 0.45rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 520px) {
  .brand-name {
    display: none;
  }

  .nav-link {
    padding: 0.35rem 0.25rem;
    font-size: 0.76rem;
  }

  .nav-inventory { gap: 4px; }
  .nav-inventory svg { width: 14px; height: 14px; }

  .nav-inventory {
    padding-inline: 0.45rem;
  }

  .nav-inventory-label {
    display: none;
  }

  .nav-link--external {
    display: none;
  }
}
</style>
