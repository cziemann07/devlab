<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getCourse } from '../content'
import { useSectionNav } from '../composables/useSectionNav'
import { useInventory } from '../composables/useInventory'

const course = getCourse()
const repositoryUrl = computed(() => course?.curso.repositorioUrl)
const courseTitle = computed(() => course?.curso.titulo)

const { goHomeSection } = useSectionNav()
const { isInventoryOpen, openInventory } = useInventory()
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
        <RouterLink v-if="course" class="nav-link" :to="`/cursos/${course.curso.slug}/atividades`">Atividades</RouterLink>
        <RouterLink v-if="course" class="nav-link" :to="`/cursos/${course.curso.slug}/desafios`">Opcionais</RouterLink>
        <button class="nav-link" type="button" @click="goHomeSection('cronograma')">
          Cronograma
        </button>
        <button class="nav-link" type="button" @click="goHomeSection('preparacao')">
          Preparação
        </button>
        <button class="nav-link" type="button" @click="goHomeSection('recursos')">
          Recursos
        </button>
        <RouterLink class="nav-link" active-class="is-active" to="/playground">
          Playground
        </RouterLink>
        <button class="nav-link nav-inventory" type="button" aria-haspopup="dialog" aria-controls="inventario" aria-label="Abrir inventário de materiais" :aria-expanded="isInventoryOpen" @click="openInventory">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9 5V4a3 3 0 0 1 6 0v1M7 5h10a3 3 0 0 1 3 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a3 3 0 0 1 3-3Z"/><path d="M8 22v-7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7M9 9h6"/></svg>
          <span class="nav-inventory-label">Inventário</span>
        </button>
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
    </div>
  </header>
</template>

<style scoped>
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
