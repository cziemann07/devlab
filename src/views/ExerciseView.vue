<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Badge from '../components/Badge.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import CodeBlock from '../components/CodeBlock.vue'
import DemoBadge from '../components/DemoBadge.vue'
import DemoNotice from '../components/DemoNotice.vue'
import EmptyState from '../components/EmptyState.vue'
import HintList from '../components/HintList.vue'
import Prose from '../components/Prose.vue'
import NotFoundView from './NotFoundView.vue'
import {
  exercisesFor,
  getCourse,
  getEncounter,
  getExercise,
} from '../content'
import { formatDateShort, formatDuration } from '../utils/date'
import { useSectionNav } from '../composables/useSectionNav'

const route = useRoute()

const course = computed(() => getCourse(String(route.params.slug ?? '')))
const exercise = computed(() =>
  course.value ? getExercise(course.value, String(route.params.id ?? '')) : undefined,
)
const encounter = computed(() =>
  course.value && exercise.value
    ? getEncounter(course.value, exercise.value.encontroId)
    : undefined,
)

const siblings = computed(() =>
  course.value && encounter.value
    ? exercisesFor(course.value, encounter.value.id)
    : [],
)
const position = computed(() =>
  exercise.value
    ? siblings.value.findIndex((item) => item.id === exercise.value?.id)
    : -1,
)
const previous = computed(() =>
  position.value > 0 ? siblings.value[position.value - 1] : undefined,
)
const next = computed(() =>
  position.value >= 0 && position.value < siblings.value.length - 1
    ? siblings.value[position.value + 1]
    : undefined,
)

const levelLabel = computed(() => {
  if (exercise.value?.nivel === 'introdutorio') return 'introdutório'
  if (exercise.value?.nivel === 'intermediario') return 'intermediário'
  return ''
})

const resolutionLabel = computed(() => {
  if (!exercise.value?.resolucao) return ''
  return exercise.value.resolucao.disponivel ? 'resolução disponível' : 'resolução em breve'
})

const sections = computed(() => {
  if (!exercise.value) return []
  return [
    { id: 'enunciado', label: 'Enunciado', present: Boolean(exercise.value.enunciadoHtml) },
    { id: 'objetivos', label: 'Objetivos', present: Boolean(exercise.value.objetivos?.length) },
    { id: 'requisitos', label: 'Requisitos', present: Boolean(exercise.value.requisitos?.length) },
    { id: 'codigo-inicial', label: 'Código inicial', present: exercise.value.codigoInicial.length > 0 },
    { id: 'dicas', label: 'Dicas', present: Boolean(exercise.value.dicasHtml?.length) },
    { id: 'resolucao', label: 'Resolução', present: Boolean(exercise.value.resolucao) },
  ].filter((section) => section.present)
})

const encounterLabel = computed(() =>
  encounter.value
    ? encounter.value.tipo === 'preparacao'
      ? 'Preparação'
      : `Encontro ${encounter.value.id}`
    : 'Encontro',
)

const encounterMeta = computed(() =>
  encounter.value?.data ? formatDateShort(encounter.value.data) : '',
)

function encounterPath(): string {
  return `/cursos/${course.value?.curso.slug ?? ''}/encontros/${encounter.value?.id ?? ''}`
}

function exercisePath(id: string): string {
  return `/cursos/${course.value?.curso.slug ?? ''}/exercicios/${id}`
}

const { goExerciseSection } = useSectionNav()
</script>

<template>
  <template v-if="course && exercise">
    <div class="container layout">
      <div class="content">
        <Breadcrumb
          :items="[
            { label: course.curso.titulo, to: '/' },
            { label: encounterLabel, to: encounterPath() },
            { label: exercise.codigo },
          ]"
        />

        <DemoNotice v-if="exercise.demonstrativo" />

        <header class="exercise-head">
          <RouterLink class="back" :to="encounterPath()">
            ← Voltar ao {{ encounterLabel }}
          </RouterLink>
          <span class="exercise-id">EXERCÍCIO {{ exercise.codigo }}</span>
          <h1>{{ exercise.titulo }}</h1>
          <p class="lead">{{ exercise.resumo }}</p>

          <div class="exercise-facts">
            <Badge v-if="formatDuration(exercise.duracaoMin)">
              {{ formatDuration(exercise.duracaoMin) }}
            </Badge>
            <Badge v-if="levelLabel">{{ levelLabel }}</Badge>
            <Badge
              v-if="resolutionLabel"
              :variant="exercise.resolucao?.disponivel ? 'primary' : 'default'"
            >
              {{ resolutionLabel }}
            </Badge>
            <Badge v-if="!exercise.disponivel" variant="warn">em breve</Badge>
            <DemoBadge :show="exercise.demonstrativo" />
          </div>
        </header>

        <template v-if="exercise.disponivel">
          <section
            v-if="exercise.enunciadoHtml"
            id="enunciado"
            class="block prose-section"
            aria-labelledby="enunciado-titulo"
          >
            <h2 id="enunciado-titulo" tabindex="-1"><span class="n">01</span>Enunciado</h2>
            <Prose :html="exercise.enunciadoHtml" />
          </section>

          <section
            v-if="exercise.objetivos?.length"
            id="objetivos"
            class="block"
            aria-labelledby="objetivos-titulo"
          >
            <h2 id="objetivos-titulo" tabindex="-1"><span class="n">02</span>Objetivos</h2>
            <ul class="goals">
              <li v-for="goal in exercise.objetivos" :key="goal">{{ goal }}</li>
            </ul>
          </section>

          <section
            v-if="exercise.requisitos?.length"
            id="requisitos"
            class="block"
            aria-labelledby="requisitos-titulo"
          >
            <h2 id="requisitos-titulo" tabindex="-1"><span class="n">03</span>Requisitos</h2>
            <ul class="requirements">
              <li v-for="requirement in exercise.requisitos" :key="requirement">
                <label>
                  <input type="checkbox" />
                  <span>{{ requirement }}</span>
                </label>
              </li>
            </ul>
            <p class="requirements-note">
              Checklist só para você acompanhar. Não fica salvo.
            </p>
          </section>

          <section
            v-if="exercise.codigoInicial.length"
            id="codigo-inicial"
            class="block"
            aria-labelledby="codigo-inicial-titulo"
          >
            <h2 id="codigo-inicial-titulo" tabindex="-1">
              <span class="n">04</span>Código inicial
            </h2>
            <div class="code-stack">
              <CodeBlock
                v-for="code in exercise.codigoInicial"
                :key="code.id"
                :codigo="code"
              />
            </div>
          </section>

          <section
            v-if="exercise.dicasHtml?.length"
            id="dicas"
            class="block"
            aria-labelledby="dicas-titulo"
          >
            <h2 id="dicas-titulo" tabindex="-1"><span class="n">05</span>Dicas</h2>
            <p class="muted">Revele uma por vez. Tente antes de abrir a próxima.</p>
            <HintList :hints="exercise.dicasHtml" />
          </section>

          <section
            v-if="exercise.resolucao"
            id="resolucao"
            class="block"
            aria-labelledby="resolucao-titulo"
          >
            <h2 id="resolucao-titulo" tabindex="-1">
              <span class="n">06</span>Resolução
              <DemoBadge :show="exercise.resolucao.demonstrativo" />
            </h2>

            <details v-if="exercise.resolucao.disponivel" class="solution">
              <summary>
                <div>
                  <strong>Resolução comentada</strong>
                  <small>Tente antes de abrir. Aprender acontece na tentativa.</small>
                </div>
              </summary>
              <div class="solution-body">
                <Prose :html="exercise.resolucao.explicacaoHtml" />
                <div v-if="exercise.resolucao.codigos.length" class="code-stack">
                  <CodeBlock
                    v-for="code in exercise.resolucao.codigos"
                    :key="code.id"
                    :codigo="code"
                  />
                </div>
              </div>
            </details>

            <EmptyState
              v-else
              icon="…"
              titulo="Resolução ainda não publicada"
              texto="A resolução comentada será publicada em uma próxima atualização do conteúdo. Enquanto isso, tente as dicas acima."
            />
          </section>

          <nav class="pager" aria-label="Navegação entre exercícios">
            <RouterLink
              v-if="previous"
              class="prev"
              :to="exercisePath(previous.id)"
            >
              <small>← {{ previous.codigo }}</small>{{ previous.titulo }}
            </RouterLink>
            <span v-else />

            <RouterLink
              v-if="next"
              class="next"
              :to="exercisePath(next.id)"
            >
              <small>próximo → {{ next.codigo }}</small>{{ next.titulo }}
            </RouterLink>
            <RouterLink v-else class="next" :to="encounterPath()">
              <small>fim do encontro →</small>Voltar ao {{ encounterLabel }}
            </RouterLink>
          </nav>
        </template>

        <template v-else>
          <EmptyState
            icon="…"
            titulo="Exercício em breve"
            texto="Este exercício ainda não foi publicado. Volte ao encontro para ver o que já está disponível."
          >
            <RouterLink class="btn btn-sm" :to="encounterPath()">
              ← Voltar ao {{ encounterLabel }}
            </RouterLink>
          </EmptyState>
        </template>
      </div>

      <aside class="rail" aria-label="Nesta página">
        <h2>Nesta página</h2>
        <ol v-if="exercise.disponivel">
          <li v-for="section in sections" :key="section.id">
            <button type="button" @click="goExerciseSection(section.id)">
              {{ section.label }}
            </button>
          </li>
        </ol>
        <div class="rail-card">
          <span class="muted">Parte do</span>
          <RouterLink :to="encounterPath()">
            <strong>{{ encounterLabel }}</strong>
            <span v-if="encounterMeta" class="muted">{{ encounterMeta }}</span>
          </RouterLink>
          <p v-if="encounter?.resumo" class="muted rail-summary">{{ encounter.resumo }}</p>
        </div>
      </aside>
    </div>
  </template>

  <NotFoundView v-else />
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 3.5rem;
  padding-block: 2.5rem 5rem;
}

.content {
  max-width: 780px;
}

.back {
  display: inline-flex;
  gap: 0.4rem;
  margin-bottom: 0.9rem;
  color: var(--text-2);
  font-size: 0.87rem;
  text-decoration: none;
}

.back:hover {
  color: var(--text);
}

.exercise-head {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.exercise-id {
  display: block;
  color: var(--primary);
  font-family: var(--font-mono);
  font-size: 0.84rem;
  font-weight: 600;
}

.exercise-head h1 {
  margin-top: 0.4rem;
  font-size: clamp(2rem, 4vw, 2.6rem);
}

.exercise-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.block {
  padding-top: 2.6rem;
  scroll-margin-top: calc(var(--header-height) + 20px);
}

.block h2 {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 1rem;
  font-size: 1.28rem;
}

.block h2 .n {
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 500;
}

.block h2 :deep(.badge) {
  align-self: center;
  margin-left: 0.25rem;
}

.block > .muted {
  margin: 0 0 1.1rem;
  font-size: 0.92rem;
}

.prose-section :deep(.prose) {
  max-width: none;
}

.goals,
.requirements {
  margin: 0;
  padding: 0;
  list-style: none;
}

.goals {
  display: grid;
  gap: 0.6rem;
}

.goals li {
  position: relative;
  padding-left: 1.6rem;
}

.goals li::before {
  position: absolute;
  left: 0;
  color: var(--primary);
  content: "→";
  font-family: var(--font-mono);
}

.requirements {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.requirements li + li {
  border-top: 1px solid var(--border);
}

.requirements label {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 0.9rem 1.1rem;
  background: var(--surface);
  cursor: pointer;
}

.requirements input {
  flex: none;
  width: 1.05rem;
  height: 1.05rem;
  margin-top: 0.2rem;
  accent-color: var(--primary);
}

.requirements input:checked + span {
  color: var(--text-2);
  text-decoration: line-through;
  text-decoration-color: var(--border);
}

.requirements-note {
  margin-top: 0.6rem;
  color: var(--text-2);
  font-size: 0.79rem;
}

.code-stack {
  display: grid;
  gap: 1rem;
}

/* Resolução */
.solution {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.solution > summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  background: var(--surface);
  cursor: pointer;
  list-style: none;
}

/* .solution usa overflow: hidden; o anel de foco precisa ficar para dentro. */
.solution > summary:focus-visible {
  outline-offset: -2px;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.solution:not([open]) > summary:focus-visible {
  border-radius: var(--radius-lg);
}

.solution > summary::-webkit-details-marker {
  display: none;
}

.solution > summary::after {
  margin-left: auto;
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  content: "Mostrar";
  font-size: 0.82rem;
  font-weight: 600;
}

.solution[open] > summary::after {
  content: "Ocultar";
}

.solution > summary small {
  display: block;
  color: var(--text-2);
  font-size: 0.84rem;
}

.solution-body {
  padding: 1.25rem;
  border-top: 1px solid var(--border);
}

.solution-body :deep(.prose) {
  margin-bottom: 1.25rem;
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 3rem;
}

.pager a {
  display: block;
  padding: 1rem 1.15rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.15s var(--ease);
}

.pager a:hover {
  border-color: var(--primary);
}

.pager small {
  display: block;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.76rem;
}

.pager .next {
  grid-column: 2;
  text-align: right;
}

/* Rail */
.rail {
  position: sticky;
  top: calc(var(--header-height) + 20px);
  align-self: start;
  font-size: 0.87rem;
}

.rail h2 {
  margin-bottom: 0.75rem;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.71rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.rail ol {
  display: grid;
  gap: 0.05rem;
  margin: 0 0 2rem;
  padding: 0 0 0 1rem;
  border-left: 1px solid var(--border);
  list-style: none;
}

.rail button {
  display: block;
  width: 100%;
  padding: 0.32rem 0;
  border: 0;
  background: transparent;
  color: var(--text-2);
  text-align: left;
  cursor: pointer;
}

.rail button:hover {
  color: var(--text);
}

.rail-card {
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.rail-card a {
  display: block;
  margin-top: 0.4rem;
  color: var(--text);
  text-decoration: none;
}

.rail-card a:hover {
  text-decoration: underline;
}

.rail-card a span {
  display: block;
}

.rail-summary {
  margin: 0.65rem 0 0;
  font-size: 0.82rem;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .rail {
    display: none;
  }
}

@media (max-width: 560px) {
  .pager {
    grid-template-columns: 1fr;
  }

  .pager .next {
    grid-column: 1;
    text-align: left;
  }
}
</style>

