<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Badge from '../components/Badge.vue'
import CodeBlock from '../components/CodeBlock.vue'
import DemoBadge from '../components/DemoBadge.vue'
import Prose from '../components/Prose.vue'
import ResourceList from '../components/ResourceList.vue'
import NotFoundView from './NotFoundView.vue'
import {
  codesFor,
  exercisesFor,
  generalReferences,
  getCourse,
  materialsFor,
  orderedStages,
} from '../content'
import { useSectionNav } from '../composables/useSectionNav'
import {
  formatDateShort,
  formatDay,
  formatMonth,
  formatTimeRange,
  formatWeekday,
  temporalStatusFor,
} from '../utils/date'
import { materialToResource } from '../utils/resources'
import type { RenderedEncontro } from '../types/content'

const route = useRoute()
const course = computed(() =>
  getCourse(typeof route.params.slug === 'string' ? route.params.slug : undefined),
)

const stages = computed(() => (course.value ? orderedStages(course.value) : []))
const preparation = computed(() =>
  course.value?.encontros.find((encounter) => encounter.tipo === 'preparacao'),
)
const meetings = computed(() =>
  stages.value.filter((encounter) => encounter.tipo === 'encontro'),
)

const titleParts = computed(() =>
  (course.value?.curso.titulo ?? '').split('+').map((part) => part.trim()),
)

const meetingSummary = computed(() =>
  meetings.value
    .map((meeting) => (meeting.data ? formatDateShort(meeting.data) : ''))
    .filter(Boolean)
    .join(' · '),
)

const meetingTime = computed(() => formatTimeRange(meetings.value[0]?.horario))

const preparationResources = computed(() =>
  course.value && preparation.value
    ? materialsFor(course.value, preparation.value.id).map(materialToResource)
    : [],
)

const preparationCode = computed(() =>
  course.value && preparation.value
    ? codesFor(course.value, preparation.value.id)[0]
    : undefined,
)

const referenceResources = computed(() =>
  course.value ? generalReferences(course.value).map(materialToResource) : [],
)

const { goHomeSection } = useSectionNav()

function stageIndex(index: number): string {
  return String(index).padStart(2, '0')
}

function stageTo(stage: RenderedEncontro): string | undefined {
  if (!course.value || !stage.disponivel) return undefined
  return `/cursos/${course.value.curso.slug}/encontros/${stage.id}`
}

function stageProps(stage: RenderedEncontro): Record<string, unknown> {
  return stageTo(stage) ? { to: stageTo(stage) } : {}
}

function stageTemporal(stage: RenderedEncontro): 'proximo' | 'realizado' | null {
  return course.value ? temporalStatusFor(course.value.encontros, stage) : null
}

function materialsCount(stage: RenderedEncontro): number {
  return course.value ? materialsFor(course.value, stage.id).length : 0
}

function exercisesCount(stage: RenderedEncontro): number {
  return course.value ? exercisesFor(course.value, stage.id).length : 0
}
</script>

<template>
  <template v-if="course">
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">// minicurso · extensão II · TADS / IFPR Foz do Iguaçu</p>
          <h1>
            <template v-for="(part, index) in titleParts" :key="index">
              <span v-if="index > 0" class="accent"> + </span>{{ part }}
            </template>
          </h1>
          <p class="lead">
            {{ course.curso.descricao }}
          </p>
          <div class="btn-row">
            <button class="btn btn-primary" type="button" @click="goHomeSection('cronograma')">
              Ver cronograma →
            </button>
            <button class="btn" type="button" @click="goHomeSection('preparacao')">
              Preparar ambiente
            </button>
          </div>
          <div class="hero-meta">
            <div>
              <strong>{{ meetings.length }} encontros</strong>
              {{ meetingSummary }}
            </div>
            <div>
              <strong>{{ meetingTime }}</strong>
              {{ course.curso.local ?? 'online' }}
            </div>
            <div>
              <strong>Gratuito</strong>
              sem cadastro
            </div>
          </div>
        </div>

        <div v-if="preparationCode" class="hero-terminal">
          <CodeBlock :codigo="preparationCode" />
        </div>
      </div>
    </section>

    <section id="cronograma" class="section" aria-labelledby="cronograma-titulo">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">// cronograma</p>
            <h2 id="cronograma-titulo" tabindex="-1">Preparação e encontros</h2>
            <p>Cada etapa reúne materiais, exercícios e código no mesmo lugar.</p>
          </div>
        </div>

        <div class="timeline">
          <component
            :is="stageTo(stage) ? RouterLink : 'div'"
            v-for="(stage, index) in stages"
            :key="stage.id"
            v-bind="stageProps(stage)"
            class="stage"
            :class="{
              'stage--prep': stage.tipo === 'preparacao',
              'stage--link': Boolean(stageTo(stage)),
              'stage--unavailable': !stage.disponivel,
            }"
          >
            <div class="stage-top">
              <span class="stage-index">
                {{ stageIndex(index) }} · {{ stage.tipo === 'preparacao' ? 'PREPARAÇÃO' : 'ENCONTRO' }}
              </span>
              <span class="stage-badges">
                <Badge v-if="stage.tipo === 'preparacao'">antes do curso</Badge>
                <Badge
                  v-else-if="stageTemporal(stage) === 'proximo'"
                  variant="primary"
                  dot
                >
                  próximo
                </Badge>
                <Badge v-else-if="stageTemporal(stage) === 'realizado'">realizado</Badge>
                <Badge v-if="!stage.disponivel" variant="warn">em breve</Badge>
                <DemoBadge :show="stage.demonstrativo" />
              </span>
            </div>

            <div v-if="stage.data" class="stage-date">
              <b>{{ formatDay(stage.data) }}</b>
              <span>
                {{ formatMonth(stage.data) }} · {{ formatWeekday(stage.data) }} ·
                {{ formatTimeRange(stage.horario) }}
              </span>
            </div>
            <div v-else class="stage-date">
              <b>00</b>
              <span>ANTES DO CURSO</span>
            </div>

            <h3>{{ stage.titulo }}</h3>
            <p>{{ stage.resumo }}</p>

            <ol class="stage-list">
              <li v-for="step in stage.sequencia.slice(0, 4)" :key="step.titulo">
                {{ step.titulo }}
              </li>
              <li v-if="stage.sequencia.length > 4" class="stage-more">
                + {{ stage.sequencia.length - 4 }} etapas
              </li>
            </ol>

            <div class="stage-foot">
              <span>{{ materialsCount(stage) }} materiais</span>
              <span>{{ exercisesCount(stage) }} exercícios</span>
              <span class="stage-go">
                {{ stage.disponivel ? (stage.tipo === 'preparacao' ? 'Ver passos →' : 'Abrir →') : 'em breve' }}
              </span>
            </div>
          </component>
        </div>
      </div>
    </section>

    <section
      v-if="preparation"
      id="preparacao"
      class="section"
      aria-labelledby="preparacao-titulo"
    >
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">// preparação</p>
            <h2 id="preparacao-titulo" tabindex="-1">Chegue com o ambiente pronto</h2>
            <p>{{ preparation.resumo }}</p>
          </div>
          <RouterLink
            v-if="preparation.disponivel"
            class="btn btn-sm"
            :to="`/cursos/${course.curso.slug}/encontros/${preparation.id}`"
          >
            Página da preparação →
          </RouterLink>
        </div>

        <div class="prep-grid">
          <div class="panel prep-copy">
            <Prose :html="preparation.descricaoHtml" />
          </div>
          <div class="prep-side">
            <h3>Downloads e links</h3>
            <ResourceList :items="preparationResources" />
          </div>
        </div>

        <div v-if="preparationCode" class="prep-code">
          <h3>Confira no terminal</h3>
          <CodeBlock :codigo="preparationCode" />
        </div>
      </div>
    </section>

    <section id="recursos" class="section" aria-labelledby="recursos-titulo">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">// recursos</p>
            <h2 id="recursos-titulo" tabindex="-1">Antes, durante e depois</h2>
          </div>
        </div>

        <div class="features">
          <div class="feature">
            <span class="k">materiais/</span>
            <h3>Slides e apostilas</h3>
            <p>Organizados por encontro, para ver no navegador ou baixar.</p>
          </div>
          <div class="feature">
            <span class="k">exercicios/</span>
            <h3>Exercícios guiados</h3>
            <p>Enunciado, dicas progressivas e resolução comentada.</p>
          </div>
          <div class="feature">
            <span class="k">codigo/</span>
            <h3>Código-fonte</h3>
            <p>Trechos prontos para copiar e o estado inicial e final de cada exemplo.</p>
          </div>
          <div class="feature">
            <span class="k">github/</span>
            <h3>Repositório</h3>
            <p>Os arquivos completos ficam no GitHub, versionados e abertos.</p>
          </div>
        </div>

        <div v-if="referenceResources.length" class="references">
          <h3>Referências gerais do curso</h3>
          <ResourceList :items="referenceResources" />
        </div>

        <div class="about">
          <p>
            <strong>DevLab</strong> é uma plataforma de apoio a minicursos de tecnologia do
            TADS / IFPR Campus Foz do Iguaçu. Reúne cronograma, materiais, exercícios e código
            em um só lugar, antes, durante e depois do evento.
          </p>
          <p class="muted">
            TADS · IFPR Campus Foz do Iguaçu · Projeto de Extensão II
          </p>
        </div>
      </div>
    </section>
  </template>

  <NotFoundView v-else />
</template>

<style scoped>
.hero {
  padding-block: 4.75rem 4rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3rem;
  align-items: center;
}

.accent {
  color: var(--primary);
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
  color: var(--text-2);
  font-size: 0.9rem;
}

.hero-meta strong {
  display: block;
  color: var(--text);
  font-size: 1rem;
  font-weight: 600;
}

.hero-terminal {
  min-width: 0;
}

/* Cronograma */
.timeline {
  display: grid;
  grid-template-columns: 0.8fr 1fr 1fr;
  gap: 1rem;
}

.stage {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: inherit;
  text-decoration: none;
}

.stage--link {
  transition:
    border-color 0.15s var(--ease),
    transform 0.2s var(--ease);
}

.stage--link:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.stage--prep {
  border-style: dashed;
  background: transparent;
}

.stage--unavailable {
  opacity: 0.85;
}

.stage-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.stage-index {
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.stage-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.stage-date {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.25rem;
}

.stage-date b {
  font-size: 2.35rem;
  font-weight: 780;
  letter-spacing: -0.04em;
  line-height: 1;
}

.stage-date span {
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
}

.stage h3 {
  margin: 0.75rem 0 0.5rem;
  font-size: 1.24rem;
}

.stage p {
  margin: 0;
  color: var(--text-2);
  font-size: 0.92rem;
}

.stage-list {
  display: grid;
  gap: 0.45rem;
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
  counter-reset: stage-item;
  font-size: 0.89rem;
}

.stage-list li {
  display: flex;
  gap: 0.6rem;
  counter-increment: stage-item;
}

.stage-list li::before {
  color: var(--primary);
  content: counter(stage-item, decimal-leading-zero);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  line-height: 1.85;
}

.stage-list .stage-more {
  color: var(--text-2);
}

.stage-list .stage-more::before {
  content: "+";
}

.stage-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
  margin-top: auto;
  padding-top: 1.5rem;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.74rem;
}

.stage-go {
  margin-left: auto;
  color: var(--text);
}

/* Preparação */
.prep-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 2rem;
  align-items: start;
}

.prep-copy {
  padding: 1.5rem;
}

.prep-side h3,
.prep-code h3,
.references h3 {
  margin-bottom: 0.9rem;
  font-size: 1rem;
}

.prep-code {
  margin-top: 2rem;
}

/* Recursos */
.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.feature {
  padding: 1.5rem;
  background: var(--surface);
}

.feature + .feature {
  border-left: 1px solid var(--border);
}

.feature .k {
  color: var(--primary);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 600;
}

.feature h3 {
  margin: 0.75rem 0 0.4rem;
}

.feature p {
  margin: 0;
  color: var(--text-2);
  font-size: 0.9rem;
}

.references {
  margin-top: 2.5rem;
}

.about {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  color: var(--text-2);
  font-size: 0.92rem;
}

.about p {
  max-width: 72ch;
}

.about strong {
  color: var(--text);
}

@media (max-width: 900px) {
  .hero {
    padding-block: 3.5rem 3rem;
  }

  .hero-grid,
  .prep-grid {
    grid-template-columns: 1fr;
  }

  .timeline {
    grid-template-columns: 1fr;
  }

  .features {
    grid-template-columns: 1fr 1fr;
  }

  .feature + .feature {
    border-left: 0;
  }

  .feature:nth-child(even) {
    border-left: 1px solid var(--border);
  }

  .feature:nth-child(n + 3) {
    border-top: 1px solid var(--border);
  }
}

@media (max-width: 520px) {
  .features {
    grid-template-columns: 1fr;
  }

  .feature:nth-child(even) {
    border-left: 0;
  }

  .feature + .feature {
    border-top: 1px solid var(--border);
  }
}
</style>
