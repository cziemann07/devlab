<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import type { RenderedCodigo } from '../types/content'
import { copyText, selectText } from '../utils/clipboard'
import Badge from './Badge.vue'
import DemoBadge from './DemoBadge.vue'
import EmptyState from './EmptyState.vue'

const props = defineProps<{ codigo: RenderedCodigo }>()

const body = ref<HTMLElement>()
const copyState = ref<'idle' | 'copied' | 'manual'>('idle')
let resetTimer: ReturnType<typeof setTimeout> | undefined

const copyLabel = computed(() => {
  if (copyState.value === 'copied') return 'Copiado'
  if (copyState.value === 'manual') return 'Selecione e copie'
  return 'Copiar'
})

const announcement = computed(() => {
  if (copyState.value === 'copied') return 'Código copiado para a área de transferência.'
  if (copyState.value === 'manual') return 'Não foi possível copiar. O código foi selecionado.'
  return ''
})

async function copyCode(): Promise<void> {
  if (!props.codigo.fonte) return
  const copied = await copyText(props.codigo.fonte)
  copyState.value = copied ? 'copied' : 'manual'
  if (!copied) {
    const code = body.value?.querySelector('code')
    if (code instanceof HTMLElement) selectText(code)
  }
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    copyState.value = 'idle'
  }, 1800)
}

onBeforeUnmount(() => {
  if (resetTimer) clearTimeout(resetTimer)
})
</script>

<template>
  <div class="code-block">
    <div class="code-head">
      <span class="file">{{ codigo.titulo }}</span>
      <Badge class="lang-badge">{{ codigo.linguagem }}</Badge>
      <DemoBadge :show="codigo.demonstrativo" />
      <span class="spacer" />
      <a
        v-if="codigo.githubUrl"
        class="btn btn-sm"
        :href="codigo.githubUrl"
        :aria-label="`GitHub: ${codigo.titulo} (abre em nova aba)`"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub ↗
      </a>
      <button
        v-if="codigo.fonte"
        class="btn btn-sm copy-btn"
        type="button"
        :data-copied="copyState === 'copied' ? 'true' : 'false'"
        :aria-label="`${copyLabel} ${codigo.titulo}`"
        @click="copyCode"
      >
        {{ copyLabel }}
      </button>
      <span class="sr-only" aria-live="polite">{{ announcement }}</span>
    </div>

    <div v-if="!codigo.disponivel" class="code-unavailable">
      <EmptyState
        icon="…"
        titulo="Código em breve"
        texto="O trecho será publicado junto com o conteúdo do encontro."
      />
    </div>

    <div v-else-if="codigo.html" ref="body" class="code-scroll" v-html="codigo.html" />

    <div v-else class="code-unavailable">
      <EmptyState
        icon="↗"
        titulo="Trecho disponível no GitHub"
        texto="Este exemplo não possui uma cópia local; abra o arquivo completo no repositório."
      />
    </div>
  </div>
</template>

<style scoped>
.code-block {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--code-bg);
}

.code-head {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.6rem 0.55rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.file {
  min-width: 0;
  overflow: hidden;
  color: var(--text);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spacer {
  flex: 1;
}

.code-head :deep(.badge) {
  flex: none;
}

.copy-btn[data-copied="true"] {
  border-color: rgba(66, 184, 131, 0.4);
  color: var(--primary);
}

.code-unavailable {
  padding: 1rem;
}

@media (max-width: 560px) {
  .code-head {
    flex-wrap: wrap;
  }

  .code-head .lang-badge {
    display: none;
  }

  .spacer {
    display: none;
  }
}
</style>
