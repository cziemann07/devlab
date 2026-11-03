<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getCourse } from '../content'
import { useSectionNav } from '../composables/useSectionNav'

const course = getCourse()
const repositoryUrl = computed(() => course?.curso.repositorioUrl)

const { goHomeSection } = useSectionNav()
</script>

<template>
  <header class="site-header">
    <div class="container">
      <RouterLink class="brand" to="/" aria-label="DevLab, página inicial">
        <span class="brand-mark" aria-hidden="true">&lt;/&gt;</span>
        <span class="brand-name">DevLab</span>
        <small>· TADS IFPR</small>
      </RouterLink>

      <nav class="site-nav" aria-label="Principal">
        <button class="nav-link" type="button" @click="goHomeSection('cronograma')">
          Cronograma
        </button>
        <button class="nav-link" type="button" @click="goHomeSection('preparacao')">
          Preparação
        </button>
        <button class="nav-link" type="button" @click="goHomeSection('recursos')">
          Recursos
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
  color: var(--primary);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.brand small {
  color: var(--text-2);
  font-size: 0.78rem;
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

@media (max-width: 720px) {
  .container {
    gap: 0.65rem;
  }

  .brand small {
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
    padding: 0.35rem 0.35rem;
    font-size: 0.76rem;
  }

  .nav-link--external {
    display: none;
  }
}
</style>
