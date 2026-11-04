<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import type { RenderedDesafio } from '../types/content'
import VuatiMascot from './VuatiMascot.vue'

/**
 * Desafio de múltipla escolha resolvido no navegador. Nada é enviado nem
 * guardado: recarregar a página recomeça o desafio.
 */
const props = withDefaults(defineProps<{ desafio: RenderedDesafio; mascote?: boolean }>(), {
  mascote: false,
})

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

const index = ref(0)
const answers = ref<(number | undefined)[]>([])
const finished = ref(false)

const questionHeading = ref<HTMLElement>()
const nextButton = ref<HTMLButtonElement>()
const resultHeading = ref<HTMLElement>()

const total = computed(() => props.desafio.perguntas.length)
const question = computed(() => props.desafio.perguntas[index.value])
const selected = computed(() => answers.value[index.value])
const answered = computed(() => selected.value !== undefined)
const isCorrect = computed(() => answered.value && selected.value === question.value.correta)
const score = computed(() =>
  answers.value.filter((answer, i) => answer === props.desafio.perguntas[i]?.correta).length,
)
const isLast = computed(() => index.value === total.value - 1)
const progress = computed(() => {
  const done = answers.value.filter((answer) => answer !== undefined).length
  return Math.round((done / Math.max(total.value, 1)) * 100)
})

const resultMessage = computed(() => {
  const ratio = score.value / Math.max(total.value, 1)
  if (ratio === 1) return 'Gabaritou! Os conceitos estão firmes.'
  if (ratio >= 0.6) return 'Bom resultado. Revise as explicações das que errou.'
  return 'Vale revisar o encontro e tentar de novo. Errar aqui faz parte do treino.'
})

function optionState(option: number): 'correta' | 'errada' | 'neutra' | 'aberta' {
  if (!answered.value) return 'aberta'
  if (option === question.value.correta) return 'correta'
  if (option === selected.value) return 'errada'
  return 'neutra'
}

async function choose(option: number): Promise<void> {
  if (answered.value) return
  const next = [...answers.value]
  next[index.value] = option
  answers.value = next
  await nextTick()
  nextButton.value?.focus()
}

async function advance(): Promise<void> {
  if (isLast.value) {
    finished.value = true
    await nextTick()
    resultHeading.value?.focus()
    return
  }
  index.value += 1
  await nextTick()
  questionHeading.value?.focus()
}

async function restart(): Promise<void> {
  answers.value = []
  index.value = 0
  finished.value = false
  await nextTick()
  questionHeading.value?.focus()
}
</script>

<template>
  <div class="quiz">
    <template v-if="!finished && question">
      <div class="quiz-progress">
        <span>Pergunta {{ index + 1 }} de {{ total }}</span>
        <span class="quiz-bar" aria-hidden="true"><span :style="{ width: `${progress}%` }" /></span>
      </div>

      <fieldset class="quiz-question">
        <legend class="sr-only">Pergunta {{ index + 1 }} de {{ total }}</legend>
        <h2 ref="questionHeading" class="quiz-statement" tabindex="-1" v-html="question.enunciadoHtml" />

        <ol class="quiz-options">
          <li v-for="(option, optionIndex) in question.alternativasHtml" :key="optionIndex">
            <button
              type="button"
              class="quiz-option"
              :class="`is-${optionState(optionIndex)}`"
              :aria-disabled="answered ? 'true' : undefined"
              @click="choose(optionIndex)"
            >
              <span class="quiz-letter" aria-hidden="true">{{ LETTERS[optionIndex] }}</span>
              <span class="quiz-option-text" v-html="option" />
              <span v-if="optionState(optionIndex) === 'correta'" class="quiz-tag">
                ✓ correta
              </span>
              <span v-else-if="optionState(optionIndex) === 'errada'" class="quiz-tag">
                ✗ sua resposta
              </span>
            </button>
          </li>
        </ol>
      </fieldset>

      <div class="quiz-feedback" role="status" aria-live="polite">
        <template v-if="answered">
          <p class="quiz-verdict" :class="isCorrect ? 'is-ok' : 'is-nok'">
            {{ isCorrect ? 'Correto!' : 'Não foi dessa vez.' }}
          </p>
          <p class="quiz-explanation" v-html="question.explicacaoHtml" />
        </template>
      </div>

      <div v-if="answered" class="quiz-actions">
        <button ref="nextButton" class="btn btn-primary" type="button" @click="advance">
          {{ isLast ? 'Ver resultado' : 'Próxima pergunta →' }}
        </button>
      </div>
    </template>

    <section
      v-else
      class="quiz-result"
      :class="{ 'quiz-result--mascote': mascote }"
      aria-labelledby="quiz-resultado"
    >
      <VuatiMascot v-if="mascote" :pose="score === total ? 'brazil' : 'front'" size="md" />
      <div>
        <h2 id="quiz-resultado" ref="resultHeading" tabindex="-1">
          {{ score }} de {{ total }} acertos
        </h2>
        <p class="muted">{{ resultMessage }}</p>
        <ol class="quiz-review">
          <li v-for="(item, i) in desafio.perguntas" :key="i">
            <span :class="answers[i] === item.correta ? 'is-ok' : 'is-nok'" aria-hidden="true">
              {{ answers[i] === item.correta ? '✓' : '✗' }}
            </span>
            <span class="sr-only">{{ answers[i] === item.correta ? 'Acertou: ' : 'Errou: ' }}</span>
            <span v-html="item.enunciadoHtml" />
          </li>
        </ol>
        <button class="btn" type="button" @click="restart">Refazer desafio</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.quiz {
  display: grid;
  gap: 1.25rem;
}

.quiz-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.quiz-bar {
  position: relative;
  flex: 1;
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--surface-2);
}

.quiz-bar span {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: inherit;
  background: var(--primary);
  transition: width 0.3s var(--ease);
}

.quiz-question {
  margin: 0;
  padding: 0;
  border: 0;
}

.quiz-statement {
  margin-bottom: 1.1rem;
  font-size: clamp(1.2rem, 2.4vw, 1.5rem);
  line-height: 1.3;
}

.quiz-statement:focus {
  outline: none;
}

.quiz-statement :deep(code),
.quiz-option-text :deep(code),
.quiz-explanation :deep(code),
.quiz-review :deep(code) {
  padding: 0.06rem 0.32rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--surface-2);
  font-size: 0.9em;
}

.quiz-options {
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text);
  font-size: 0.98rem;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.15s var(--ease),
    background 0.15s var(--ease);
}

.quiz-option.is-aberta:hover {
  border-color: var(--primary-line);
  background: var(--surface-2);
}

.quiz-option[aria-disabled="true"] {
  cursor: default;
}

.quiz-letter {
  display: grid;
  flex: none;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
}

.quiz-option-text {
  flex: 1;
}

.quiz-tag {
  flex: none;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
}

.quiz-option.is-correta {
  border-color: var(--primary);
  background: var(--primary-soft);
}

.quiz-option.is-correta .quiz-letter,
.quiz-option.is-correta .quiz-tag {
  border-color: var(--primary);
  color: var(--primary);
}

.quiz-option.is-errada {
  border-color: color-mix(in srgb, var(--danger) 60%, transparent);
  background: color-mix(in srgb, var(--danger) 9%, transparent);
}

.quiz-option.is-errada .quiz-letter,
.quiz-option.is-errada .quiz-tag {
  border-color: var(--danger);
  color: var(--danger);
}

.quiz-option.is-neutra {
  color: var(--text-2);
}

.quiz-feedback:empty {
  display: none;
}

.quiz-verdict {
  margin: 0 0 0.25rem;
  font-weight: 700;
}

.is-ok {
  color: var(--primary);
}

.is-nok {
  color: var(--danger);
}

.quiz-explanation {
  max-width: 68ch;
  margin: 0;
  color: var(--text-2);
}

.quiz-result {
  display: grid;
  align-items: center;
  gap: 1.5rem 2rem;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.quiz-result--mascote {
  grid-template-columns: auto minmax(0, 1fr);
}

@media (max-width: 620px) {
  .quiz-result--mascote {
    grid-template-columns: minmax(0, 1fr);
  }
}

.quiz-result h2 {
  font-size: 1.6rem;
}

.quiz-result h2:focus {
  outline: none;
}

.quiz-review {
  display: grid;
  gap: 0.4rem;
  margin: 1rem 0 1.25rem;
  padding: 0;
  color: var(--text-2);
  font-size: 0.9rem;
  list-style: none;
}

.quiz-review li {
  display: flex;
  gap: 0.6rem;
}

.quiz-review .is-ok,
.quiz-review .is-nok {
  font-family: var(--font-mono);
  font-weight: 700;
}
</style>
