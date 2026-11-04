<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { MomentView } from '../utils/moment-view'

/** Painel "agora": o que importa para o estudante neste momento do curso. */
defineProps<{ view: MomentView; simulado?: string }>()
const emit = defineEmits<{ atento: [value: boolean] }>()

function simulatedLabel(iso: string): string {
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)}`
}
</script>

<template>
  <section
    class="now"
    aria-labelledby="agora-titulo"
    @focusin="emit('atento', true)"
    @focusout="emit('atento', false)"
  >
    <div class="now-copy">
      <p class="now-label">
        <span class="now-pulse" aria-hidden="true" />
        {{ view.rotulo }}
        <span v-if="simulado" class="now-sim">
          simulando {{ simulatedLabel(simulado) }} ·
          <RouterLink to="/">usar a data real</RouterLink>
        </span>
      </p>
      <h2 id="agora-titulo">{{ view.titulo }}</h2>
      <p class="now-text">{{ view.texto }}</p>
    </div>

    <div
      v-if="view.acoes.length"
      class="now-actions"
      @mouseenter="emit('atento', true)"
      @mouseleave="emit('atento', false)"
    >
      <template v-for="action in view.acoes" :key="action.label">
        <a
          v-if="action.href"
          class="btn"
          :class="{ 'btn-primary': action.primary }"
          :href="action.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${action.label} (abre em nova aba)`"
        >
          {{ action.label }} ↗
        </a>
        <RouterLink
          v-else-if="action.to"
          class="btn"
          :class="{ 'btn-primary': action.primary }"
          :to="action.to"
        >
          {{ action.label }}{{ action.primary ? ' →' : '' }}
        </RouterLink>
      </template>
    </div>
  </section>
</template>

<style scoped>
.now {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.25rem 2.5rem;
  align-items: center;
  padding: 1.4rem 1.5rem;
  border: 1px solid var(--border);
  border-left: 3px solid var(--primary);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(90deg, var(--primary-glow), transparent 55%),
    var(--surface);
}

.now-label {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.45rem;
  color: var(--primary);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.now-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 0 0 var(--primary-line);
  animation: now-pulse 2.4s ease-out infinite;
}

@keyframes now-pulse {
  0% {
    box-shadow: 0 0 0 0 var(--primary-line);
  }

  70%,
  100% {
    box-shadow: 0 0 0 8px transparent;
  }
}

.now-sim {
  color: var(--warn);
  font-weight: 500;
}

.now-sim a {
  color: inherit;
}

.now h2 {
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
  letter-spacing: -0.015em;
}

.now-text {
  max-width: 62ch;
  margin: 0.45rem 0 0;
  color: var(--text-2);
  font-size: 0.95rem;
}

.now-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.6rem;
  max-width: 30rem;
}

@media (max-width: 860px) {
  .now {
    grid-template-columns: 1fr;
  }

  .now-actions {
    justify-content: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .now-pulse {
    animation: none;
  }
}
</style>
