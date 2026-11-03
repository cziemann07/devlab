<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

const props = defineProps<{ hints: string[] }>()

const revealed = ref(0)
const hintElements = new Map<number, HTMLElement>()

const allShown = computed(() => revealed.value >= props.hints.length)
const buttonLabel = computed(() =>
  revealed.value === 0 ? 'Mostrar primeira dica' : 'Mostrar próxima dica',
)
const counter = computed(() => `${revealed.value} de ${props.hints.length}`)

function setHintElement(element: Element | null, index: number): void {
  if (element instanceof HTMLElement) {
    hintElements.set(index, element)
  } else {
    hintElements.delete(index)
  }
}

async function showNext(): Promise<void> {
  if (allShown.value) return
  const index = revealed.value
  revealed.value += 1
  await nextTick()
  hintElements.get(index)?.focus()
}
</script>

<template>
  <div class="hints">
    <div
      v-for="(hint, index) in hints"
      v-show="index < revealed"
      :key="index"
      :ref="(element) => setHintElement(element as Element | null, index)"
      class="hint"
      tabindex="-1"
    >
      <b>Dica {{ index + 1 }}</b>
      <div class="hint-body" v-html="hint" />
    </div>

    <div class="hints-bar">
      <button v-if="!allShown" class="btn btn-sm" type="button" @click="showNext">
        {{ buttonLabel }}
      </button>
      <span class="hints-count" aria-live="polite">{{ counter }}</span>
    </div>
  </div>
</template>

<style scoped>
.hints {
  display: grid;
  gap: 0.75rem;
}

.hint {
  padding: 1rem 1.15rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.hint:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.hint b {
  display: block;
  margin-bottom: 0.35rem;
  color: var(--warn);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
}

.hint-body :deep(p) {
  margin: 0;
}

.hint-body :deep(code) {
  padding: 0.08rem 0.34rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--surface-2);
  font-size: 0.88em;
}

.hints-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hints-count {
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
</style>
