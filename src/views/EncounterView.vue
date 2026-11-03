<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Badge from '../components/Badge.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import CodeBlock from '../components/CodeBlock.vue'
import DemoBadge from '../components/DemoBadge.vue'
import DemoNotice from '../components/DemoNotice.vue'
import EmptyState from '../components/EmptyState.vue'
import Prose from '../components/Prose.vue'
import ResourceList from '../components/ResourceList.vue'
import NotFoundView from './NotFoundView.vue'
import {
  codesFor,
  exercisesFor,
  getCourse,
  getEncounter,
  materialsFor,
  orderedStages,
} from '../content'
import {
  formatDateLong,
  formatTimeRange,
  temporalStatusFor,
} from '../utils/date'
import { exerciseToResource, materialToResource } from '../utils/resources'

const route = useRoute()

const course = computed(() => getCourse(String(route.params.slug ?? '')))
const encounter = computed(() =>
  course.value ? getEncounter(course.value, String(route.params.id ?? '')) : undefined,
)

const stages = computed(() => (course.value ? orderedStages(course.value) : []))
const stageIndex = computed(() =>
  encounter.value ? stages.value.findIndex((stage) => stage.id === encounter.value?.id) : -1,
)
const previous = computed(() => (stageIndex.value > 0 ? stages.value[stageIndex.value - 1] : undefined))
const next = computed(() =>
  stageIndex.value >= 0 && stageIndex.value < stages.value.length - 1
    ? stages.value[stageIndex.value + 1]
    : undefined,
)

const temporal = computed(() =>
  course.value && encounter.value
    ? temporalStatusFor(course.value.encontros, encounter.value)
    : null,
)

const materialItems = computed(() =>
  course.value && encounter.value
    ? materialsFor(course.value, encounter.value.id).map(materialToResource)
    : [],
)

const exerciseItems = computed(() =>
  course.value && encounter.value
    ? exercisesFor(course.value, encounter.value.id).map((exercise) =>
        exerciseToResource(exercise, course.value!.curso.slug),
      )
    : [],
)

const codeItems = computed(() =>
  course.value && encounter.value ? codesFor(course.value, encounter.value.id) : [],
)

const initialState = computed(() =>
  codeItems.value.find((code) => code.papel === 'inicial' && code.githubUrl),
)
const finalState = computed(() =>
  codeItems.value.find((code) => code.papel === 'final' && code.githubUrl),
)

function catalogLabel(index: number, type: string, data?: string): string {
  const base = String(index).padStart(2, '0')
  if (type === 'preparacao') return base
  return data ? `${base} · ${data.slice(8, 10)}/${data.slice(5, 7)}` : base
}

function encounterPath(id: string): string {
  return `/cursos/${course.value?.curso.slug ?? ''}/encontros/${id}`
}

function encounterTitle(type: string, id: string): string {
  return type === 'preparacao' ? 'Preparação' : `Encontro ${id}`
}
</script>

<template>
  <template v-if="course && encounter">
    <div class="container layout">
      <aside class="stages" aria-label="Etapas do minicurso">
        <h2>{{ course.curso.titulo }}</h2>
        <ol>
          <li v-for="(stage, index) in stages" :key="stage.id">
            <RouterLink
              v-if="stage.disponivel"
              :to="encounterPath(stage.id)"
              :aria-current="stage.id === encounter.id ? 'page' : undefined"
            >
              <small>{{ catalogLabel(index, stage.tipo, stage.data) }}</small>
              {{ stage.titulo }}
            </RouterLink>
            <span v-else class="stage-disabled">
              <small>em breve</small>
              {{ stage.titulo }}
            </span>
          </li>
        </ol>
        <RouterLink class="course-link" to="/">← Visão geral do curso</RouterLink>
      </aside>

      <div class="content">
        <Breadcrumb
          :items="[
            { label: course.curso.titulo, to: '/' },
            { label: 'Cronograma', to: '/' },
            { label: encounterTitle(encounter.tipo, encounter.id) },
          ]"
        />

        <DemoNotice v-if="encounter.demonstrativo" />

        <header class="encounter-head">
          <p class="eyebrow">
            // {{ encounter.tipo === 'preparacao' ? 'preparação' : `encontro ${encounter.id}` }}
          </p>
          <h1>{{ encounter.titulo }}</h1>
          <p class="lead">{{ encounter.resumo }}</p>

          <div class="encounter-facts">
            <Badge v-if="encounter.tipo === 'preparacao'">antes do curso</Badge>
            <Badge v-else-if="temporal === 'proximo'" variant="primary" dot>
              próximo encontro
            </Badge>
            <Badge v-else-if="temporal === 'realizado'">realizado</Badge>
            <Badge v-if="encounter.data">{{ formatDateLong(encounter.data) }}</Badge>
            <Badge v-if="encounter.horario">{{ formatTimeRange(encounter.horario) }}</Badge>
            <Badge v-if="encounter.local">{{ encounter.local }}</Badge>
            <Badge v-if="!encounter.disponivel" variant="warn">em breve</Badge>
            <DemoBadge :show="encounter.demonstrativo" />
          </div>
        </header>

        <template v-if="encounter.disponivel">
          <Prose v-if="encounter.descricaoHtml" class="encounter-description" :html="encounter.descricaoHtml" />

          <section
            v-if="encounter.sequencia.length"
            class="block"
            aria-labelledby="sequencia-titulo"
          >
            <h2 id="sequencia-titulo">Sequência</h2>
            <p class="muted">Roteiro previsto. Os horários podem variar.</p>
            <ol class="agenda">
              <li v-for="step in encounter.sequencia" :key="`${step.titulo}-${step.horario}`">
                <time v-if="step.horario">{{ step.horario }}</time>
                <strong>{{ step.titulo }}</strong>
                <span v-if="step.detalhe">{{ step.detalhe }}</span>
              </li>
            </ol>
          </section>

          <section v-if="materialItems.length" class="block" aria-labelledby="materiais-titulo">
            <h2 id="materiais-titulo">Materiais</h2>
            <p class="muted">Slides, apostilas e referências desta etapa.</p>
            <ResourceList :items="materialItems" />
          </section>

          <section v-if="exerciseItems.length" class="block" aria-labelledby="exercicios-titulo">
            <h2 id="exercicios-titulo">Exercícios</h2>
            <p class="muted">Cada exercício tem enunciado, dicas e resolução quando publicada.</p>
            <ResourceList :items="exerciseItems" />
          </section>

          <section v-if="codeItems.length" class="block" aria-labelledby="codigo-titulo">
            <h2 id="codigo-titulo">Código desta etapa</h2>
            <p class="muted">
              Os arquivos completos estão no GitHub. Aqui ficam os trechos principais.
            </p>
            <div class="code-actions">
              <a
                v-if="initialState?.githubUrl"
                class="btn btn-sm"
                :href="initialState.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Estado inicial ↗
              </a>
              <a
                v-if="finalState?.githubUrl"
                class="btn btn-sm"
                :href="finalState.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Estado final ↗
              </a>
              <a
                v-if="course.curso.repositorioUrl"
                class="btn btn-sm"
                :href="course.curso.repositorioUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Repositório do minicurso ↗
              </a>
            </div>
            <div class="code-stack">
              <CodeBlock v-for="code in codeItems" :key="code.id" :codigo="code" />
            </div>
          </section>
        </template>

        <EmptyState
          v-else
          icon="…"
          titulo="Conteúdo em breve"
          texto="Esta etapa ainda não foi publicada. Enquanto isso, consulte a preparação e os encontros disponíveis."
        />

        <nav class="pager" aria-label="Navegação entre etapas">
          <RouterLink
            v-if="previous?.disponivel"
            class="prev"
            :to="encounterPath(previous.id)"
          >
            <small>← anterior</small>{{ previous.titulo }}
          </RouterLink>
          <span v-else />
          <RouterLink
            v-if="next?.disponivel"
            class="next"
            :to="encounterPath(next.id)"
          >
            <small>próximo →</small>{{ next.titulo }}
          </RouterLink>
          <span v-else />
        </nav>
      </div>
    </div>
  </template>

  <NotFoundView v-else />
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 3rem;
  padding-block: 2.5rem 5rem;
}

.stages {
  position: sticky;
  top: calc(var(--header-height) + 20px);
  align-self: start;
}

.stages h2 {
  margin-bottom: 0.75rem;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.stages ol {
  display: grid;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stages a,
.stage-disabled {
  display: block;
  padding: 0.6rem 0.75rem;
  border: 1px solid transparent;
  border-radius: var(--radius);
  color: inherit;
  text-decoration: none;
}

.stages a:hover {
  background: var(--surface);
}

.stages a[aria-current="page"] {
  border-color: var(--border);
  background: var(--surface);
  box-shadow: inset 2px 0 0 var(--primary);
}

.stage-disabled {
  color: var(--text-2);
}

.stages small {
  display: block;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.7rem;
}

.course-link {
  display: block;
  margin-top: 1.5rem;
  color: var(--text-2);
  font-size: 0.84rem;
  text-decoration: none;
}

.course-link:hover {
  color: var(--text);
}

.encounter-description {
  margin-top: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.encounter-head {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.encounter-head h1 {
  margin-top: 0.45rem;
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.encounter-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.block {
  padding-top: 2.75rem;
}

.block h2 {
  margin-bottom: 0.35rem;
  font-size: 1.3rem;
}

.block > .muted {
  margin: 0 0 1.25rem;
  font-size: 0.93rem;
}

.agenda {
  margin: 0 0 0 0.4rem;
  padding: 0;
  border-left: 1px solid var(--border);
  list-style: none;
}

.agenda li {
  position: relative;
  padding: 0 0 1.4rem 1.6rem;
}

.agenda li::before {
  position: absolute;
  top: 0.45rem;
  left: -5px;
  width: 9px;
  height: 9px;
  border: 2px solid var(--border);
  border-radius: 50%;
  background: var(--bg);
  content: "";
}

.agenda time {
  color: var(--primary);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.agenda strong {
  display: block;
  font-weight: 600;
}

.agenda span {
  color: var(--text-2);
  font-size: 0.9rem;
}

.code-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1rem;
}

.code-stack {
  display: grid;
  gap: 1rem;
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

@media (max-width: 900px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
    padding-top: 1.25rem;
  }

  .stages {
    position: static;
  }

  .stages h2,
  .stages .course-link {
    display: none;
  }

  .stages ol {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }

  .stages a,
  .stage-disabled {
    border-color: var(--border);
    white-space: nowrap;
  }
}
</style>
