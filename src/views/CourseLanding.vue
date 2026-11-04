<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Badge from '../components/Badge.vue'
import CodeBlock from '../components/CodeBlock.vue'
import CourseNow from '../components/CourseNow.vue'
import DemoBadge from '../components/DemoBadge.vue'
import DemoNotice from '../components/DemoNotice.vue'
import Prose from '../components/Prose.vue'
import ResourceList from '../components/ResourceList.vue'
import VuatiStage from '../components/VuatiStage.vue'
import NotFoundView from './NotFoundView.vue'
import {
  challengesFor,
  codesFor,
  coursePath,
  exercisesFor,
  generalReferences,
  getCourse,
  materialsFor,
  orderedStages,
} from '../content'
import { datedMeetings, useCourseMoment } from '../composables/useCourseMoment'
import {
  formatDayList,
  formatDay,
  formatMonth,
  formatTimeRange,
  formatWeekday,
  isoDateIn,
  temporalStatusFor,
  type TemporalStatus,
} from '../utils/date'
import { describeMoment } from '../utils/moment-view'
import {
  challengeToResource,
  materialToResource,
  questionnaireToResource,
} from '../utils/resources'
import { groupSequence } from '../utils/sequence'
import type { RenderedEncontro } from '../types/content'

const route = useRoute()
const course = computed(() =>
  getCourse(typeof route.params.slug === 'string' ? route.params.slug : undefined),
)

const { moment, now, simulated } = useCourseMoment(course)
const view = computed(() => (course.value ? describeMoment(course.value, moment.value) : undefined))
const atento = ref(false)

const stages = computed(() => (course.value ? orderedStages(course.value) : []))
const meetings = computed(() => (course.value ? datedMeetings(course.value) : []))
const preparation = computed(() =>
  course.value?.encontros.find((encounter) => encounter.tipo === 'preparacao'),
)

/* Identidade do curso */
const titleParts = computed(() => {
  const title = course.value?.curso.titulo ?? ''
  const highlight = course.value?.curso.tituloDestaque
  const at = highlight ? title.indexOf(highlight) : -1
  if (!highlight || at < 0) return { before: title, highlight: '', after: '' }
  return {
    before: title.slice(0, at),
    highlight,
    after: title.slice(at + highlight.length),
  }
})
const hasMascot = computed(() => Boolean(course.value?.curso.tema?.mascote))

const facts = computed(() => {
  const list: { rotulo: string; valor: string }[] = []
  const dates = meetings.value.map((meeting) => meeting.data!)
  if (dates.length) {
    list.push({
      rotulo: dates.length === 1 ? 'Encontro' : `${dates.length} encontros`,
      valor: formatDayList(dates),
    })
  }
  const time = formatTimeRange(meetings.value[0]?.horario)
  if (time) list.push({ rotulo: 'Horário', valor: time })
  const place = meetings.value[0]?.local ?? course.value?.curso.local
  if (place) list.push({ rotulo: 'Local', valor: place })
  const access = course.value?.curso.acesso
  if (access) {
    list.push({
      rotulo: 'Participação',
      valor: access.detalhe ? `${access.rotulo} · ${access.detalhe}` : access.rotulo,
    })
  }
  return list
})

/* Cronograma */
type TrackState = 'feito' | 'atual' | 'futuro'

function stageTo(stage: RenderedEncontro): string | undefined {
  if (!course.value || !stage.disponivel) return undefined
  return coursePath(course.value, 'encontros', stage.id)
}

function stageTemporal(stage: RenderedEncontro): TemporalStatus {
  return course.value ? temporalStatusFor(course.value.encontros, stage, now.value) : null
}

function isCurrent(stage: RenderedEncontro): boolean {
  const current = moment.value
  if (current.tipo === 'antes') return stage.tipo === 'preparacao'
  if (current.tipo === 'hoje') return current.atual.id === stage.id
  if (current.tipo === 'entre') return current.proximo.id === stage.id
  return false
}

function trackState(stage: RenderedEncontro): TrackState {
  const current = moment.value
  if (isCurrent(stage) && current.tipo !== 'entre') return 'atual'
  if (stage.tipo === 'preparacao') return current.tipo === 'antes' ? 'atual' : 'feito'
  if (current.tipo === 'depois') return 'feito'
  if (current.tipo === 'antes' || current.tipo === 'sem-datas') return 'futuro'
  const reference = current.tipo === 'hoje' ? current.atual : current.proximo
  return (stage.data ?? '') < (reference.data ?? '') ? 'feito' : 'futuro'
}

function trackLabel(stage: RenderedEncontro): string {
  if (stage.tipo === 'preparacao') return 'Antes'
  return stage.data ? `${formatDay(stage.data)} ${formatMonth(stage.data).toLowerCase()}` : '—'
}

const betweenAfter = computed(() =>
  moment.value.tipo === 'entre' ? moment.value.anterior.id : undefined,
)
const todayLabel = computed(() => {
  const iso = isoDateIn(now.value)
  return `${formatDay(iso)} ${formatMonth(iso).toLowerCase()}`
})

function counts(stage: RenderedEncontro): string[] {
  if (!course.value) return []
  const items: string[] = []
  const materials = materialsFor(course.value, stage.id).length
  const exercises = exercisesFor(course.value, stage.id).length
  const challenges = challengesFor(course.value, stage.id).length
  const codes = codesFor(course.value, stage.id).length
  if (materials) items.push(`${materials} ${materials === 1 ? 'material' : 'materiais'}`)
  if (exercises) items.push(`${exercises} ${exercises === 1 ? 'exercício' : 'exercícios'}`)
  if (challenges) items.push(`${challenges} ${challenges === 1 ? 'desafio' : 'desafios'}`)
  if (codes) items.push(`${codes} ${codes === 1 ? 'código' : 'códigos'}`)
  return items
}

/* Preparação e recursos */
const preparationResources = computed(() =>
  course.value && preparation.value
    ? materialsFor(course.value, preparation.value.id).map(materialToResource)
    : [],
)
const preparationCode = computed(() =>
  course.value && preparation.value ? codesFor(course.value, preparation.value.id)[0] : undefined,
)
const challengeResources = computed(() =>
  course.value
    ? course.value.desafios.map((challenge) => challengeToResource(challenge, course.value!.curso.slug))
    : [],
)
const questionnaireResources = computed(() =>
  course.value ? course.value.questionarios.map(questionnaireToResource) : [],
)
const referenceResources = computed(() =>
  course.value ? generalReferences(course.value).map(materialToResource) : [],
)
</script>

<template>
  <template v-if="course">
    <section class="hero" aria-labelledby="curso-titulo">
      <div class="container hero-grid" :class="{ 'hero-grid--solo': !hasMascot }">
        <div class="hero-copy">
          <p class="hero-kicker">
            Minicurso<template v-if="course.curso.local"> · {{ course.curso.local }}</template>
          </p>
          <h1 id="curso-titulo" class="hero-title">
            {{ titleParts.before }}<span v-if="titleParts.highlight" class="hero-highlight">{{
              titleParts.highlight
            }}</span>{{ titleParts.after }}
          </h1>
          <p class="hero-tagline">{{ course.curso.subtitulo }}</p>
          <p class="hero-lead">{{ course.curso.descricao }}</p>

          <dl v-if="facts.length" class="hero-facts">
            <div v-for="fact in facts" :key="fact.rotulo">
              <dt>{{ fact.rotulo }}</dt>
              <dd>{{ fact.valor }}</dd>
            </div>
          </dl>
        </div>

        <VuatiStage
          v-if="hasMascot"
          class="hero-mascot"
          :pose="view?.pose ?? 'front'"
          :fala="view?.fala"
          :atento="atento"
        />
      </div>

      <div v-if="view" class="container hero-now">
        <CourseNow :view="view" :simulado="simulated" @atento="atento = $event" />
      </div>
    </section>

    <section id="cronograma" class="section schedule" aria-labelledby="cronograma-titulo">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">Cronograma</p>
            <h2 id="cronograma-titulo" tabindex="-1">Preparação e encontros</h2>
            <p>Cada etapa reúne materiais, exercícios e código no mesmo lugar.</p>
          </div>
        </div>

        <DemoNotice
          v-if="course.curso.aviso"
          :titulo="course.curso.aviso.titulo"
          :texto="course.curso.aviso.texto"
        />

        <ol class="track" aria-label="Linha do tempo do minicurso">
          <template v-for="stage in stages" :key="stage.id">
            <li class="track-node" :class="`is-${trackState(stage)}`">
              <span class="track-dot" aria-hidden="true" />
              <span class="track-when">{{ trackLabel(stage) }}</span>
              <span class="track-what">
                {{ stage.tipo === 'preparacao' ? 'Preparação' : `Encontro ${stage.id}` }}
              </span>
              <span v-if="trackState(stage) === 'atual'" class="track-here">você está aqui</span>
            </li>
            <li v-if="betweenAfter === stage.id" class="track-node is-atual is-between">
              <span class="track-dot" aria-hidden="true" />
              <span class="track-when">{{ todayLabel }}</span>
              <span class="track-what">Revisão</span>
              <span class="track-here">você está aqui</span>
            </li>
          </template>
          <li class="track-node" :class="moment.tipo === 'depois' ? 'is-atual' : 'is-futuro'">
            <span class="track-dot" aria-hidden="true" />
            <span class="track-when">Depois</span>
            <span class="track-what">Revisão</span>
            <span v-if="moment.tipo === 'depois'" class="track-here">você está aqui</span>
          </li>
        </ol>

        <ol class="stages">
          <li
            v-for="(stage, index) in stages"
            :key="stage.id"
            class="stage"
            :class="{
              'stage--prep': stage.tipo === 'preparacao',
              'stage--current': isCurrent(stage),
              'stage--unavailable': !stage.disponivel,
            }"
          >
            <component
              :is="stageTo(stage) ? RouterLink : 'div'"
              v-bind="stageTo(stage) ? { to: stageTo(stage) } : {}"
              class="stage-body"
              :class="{ 'stage-body--link': Boolean(stageTo(stage)) }"
            >
              <div class="stage-when">
                <template v-if="stage.data">
                  <b>{{ formatDay(stage.data) }}</b>
                  <span>{{ formatMonth(stage.data) }} · {{ formatWeekday(stage.data) }}</span>
                  <span>{{ formatTimeRange(stage.horario) }}</span>
                </template>
                <template v-else>
                  <b>{{ String(index).padStart(2, '0') }}</b>
                  <span>antes do curso</span>
                </template>
              </div>

              <div class="stage-main">
                <div class="stage-top">
                  <span class="stage-kind">
                    {{ stage.tipo === 'preparacao' ? 'Preparação' : `Encontro ${stage.id}` }}
                  </span>
                  <Badge v-if="stageTemporal(stage) === 'hoje'" variant="primary" dot>hoje</Badge>
                  <Badge v-else-if="stageTemporal(stage) === 'proximo'" variant="primary" dot>
                    próximo
                  </Badge>
                  <Badge v-else-if="stageTemporal(stage) === 'realizado'">realizado</Badge>
                  <Badge v-if="!stage.disponivel" variant="warn">em breve</Badge>
                  <DemoBadge :show="stage.demonstrativo" />
                </div>

                <h3>{{ stage.titulo }}</h3>
                <p class="stage-summary">{{ stage.resumo }}</p>

                <div v-if="stage.sequencia.length" class="stage-topics">
                  <div
                    v-for="group in groupSequence(stage.sequencia)"
                    :key="group.grupo ?? 'topicos'"
                    class="topic-group"
                  >
                    <span v-if="group.grupo" class="topic-label">{{ group.grupo }}</span>
                    <ul>
                      <li v-for="step in group.itens" :key="step.titulo">{{ step.titulo }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="stage-side">
                <ul v-if="counts(stage).length" class="stage-counts">
                  <li v-for="count in counts(stage)" :key="count">{{ count }}</li>
                </ul>
                <span class="stage-go">
                  {{
                    stage.disponivel
                      ? stage.tipo === 'preparacao'
                        ? 'Ver passos →'
                        : 'Abrir encontro →'
                      : 'em breve'
                  }}
                </span>
              </div>
            </component>
          </li>
        </ol>
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
            <p class="eyebrow">Preparação</p>
            <h2 id="preparacao-titulo" tabindex="-1">Chegue com o ambiente pronto</h2>
            <p>{{ preparation.resumo }}</p>
          </div>
          <RouterLink
            v-if="preparation.disponivel"
            class="btn btn-sm"
            :to="coursePath(course, 'encontros', preparation.id)"
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
            <p class="eyebrow">Recursos</p>
            <h2 id="recursos-titulo" tabindex="-1">Antes, durante e depois</h2>
            <p>Para recuperar uma etapa na aula e para revisar em casa.</p>
          </div>
        </div>

        <div class="lost">
          <h3 class="lost-title">Perdeu uma etapa durante a aula?</h3>
          <ol class="lost-steps">
            <li><b>Abra o encontro do dia</b> no cronograma.</li>
            <li><b>Entre no exercício</b> em que a turma está.</li>
            <li><b>Copie o código inicial</b> ou revele uma dica e volte para o VS Code.</li>
          </ol>
        </div>

        <div
          v-if="challengeResources.length || questionnaireResources.length"
          class="resource-grid"
        >
          <div v-if="challengeResources.length">
            <h3>Desafios rápidos</h3>
            <p class="muted resource-note">
              Perguntas de múltipla escolha para fixar os conceitos. Funcionam no navegador, sem
              cadastro, nota ou ranking.
            </p>
            <ResourceList :items="challengeResources" />
          </div>
          <div v-if="questionnaireResources.length">
            <h3>Questionários</h3>
            <p class="muted resource-note">
              Abrem em um formulário externo da organização. O DevLab não coleta nem guarda
              respostas.
            </p>
            <ResourceList :items="questionnaireResources" />
          </div>
        </div>

        <div v-if="referenceResources.length" class="references">
          <h3>Referências gerais</h3>
          <ResourceList :items="referenceResources" />
        </div>

        <div class="about">
          <p>
            <strong>DevLab</strong> é uma plataforma de apoio a minicursos de tecnologia,
            desenvolvida por estudantes do TADS / IFPR Campus Foz do Iguaçu no Projeto de
            Extensão II. Reúne cronograma, materiais, exercícios e código em um só lugar,
            antes, durante e depois do evento. É uma iniciativa estudantil, não um sistema
            oficial do IFPR.
          </p>
        </div>
      </div>
    </section>
  </template>

  <NotFoundView v-else />
</template>

<style scoped>
/* Hero */
.hero {
  position: relative;
  overflow-x: clip;
  padding-block: 3.5rem 3rem;
  border-bottom: 1px solid var(--border);
  background: radial-gradient(ellipse 45% 60% at 78% 40%, var(--primary-glow), transparent 70%);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 2rem;
  align-items: center;
}

.hero-grid--solo {
  grid-template-columns: 1fr;
}

.hero-kicker {
  margin: 0 0 1.1rem;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(3.1rem, 8.6vw, 6.4rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.95;
}

.hero-highlight {
  color: var(--primary);
}

.hero-tagline {
  margin: 1.1rem 0 0;
  color: var(--text);
  font-size: clamp(1.2rem, 2.3vw, 1.55rem);
  font-weight: 500;
  letter-spacing: -0.015em;
}

.hero-lead {
  max-width: 56ch;
  margin: 1rem 0 0;
  color: var(--text-2);
  font-size: 1.05rem;
}

.hero-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2rem;
  margin: 1.75rem 0 0;
}

.hero-facts dt {
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero-facts dd {
  margin: 0.15rem 0 0;
  font-weight: 600;
}

.hero-mascot {
  justify-self: center;
}

.hero-now {
  margin-top: 2.25rem;
}

/* Linha do tempo */
.track {
  display: flex;
  margin: 0 0 2rem;
  padding: 0;
  list-style: none;
}

.track-node {
  position: relative;
  display: grid;
  flex: 1;
  align-content: start;
  gap: 0.1rem;
  padding-top: 1.35rem;
  color: var(--text-2);
  font-size: 0.84rem;
}

.track-node::before {
  position: absolute;
  top: 5px;
  right: 0;
  left: 0;
  height: 2px;
  background: var(--border);
  content: "";
}

.track-node:first-child::before {
  left: 6px;
}

.track-node:last-child::before {
  right: auto;
  width: 6px;
}

.track-node.is-feito::before {
  background: var(--primary-line);
}

.track-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  border: 2px solid var(--border-strong);
  border-radius: 50%;
  background: var(--bg);
}

.is-feito .track-dot {
  border-color: var(--primary-line);
  background: var(--primary-line);
}

.is-atual .track-dot {
  border-color: var(--primary);
  background: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-soft);
}

.track-when {
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
}

.is-futuro .track-when {
  color: var(--text-2);
}

.track-here {
  color: var(--primary);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
}

.is-between .track-what {
  color: var(--text);
}

/* Etapas */
.stages {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stage-body {
  display: grid;
  grid-template-columns: 9.5rem minmax(0, 1fr) 11rem;
  gap: 1.75rem;
  padding: 1.5rem 1.6rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: inherit;
  text-decoration: none;
}

.stage-body--link {
  transition:
    border-color 0.15s var(--ease),
    background 0.15s var(--ease);
}

.stage-body--link:hover {
  border-color: var(--border-strong);
  background: var(--surface-2);
}

.stage--prep .stage-body {
  border-style: dashed;
  background: transparent;
}

.stage--current .stage-body {
  border-color: var(--primary-line);
  box-shadow: inset 3px 0 0 var(--primary);
}

.stage--unavailable .stage-body {
  opacity: 0.85;
}

.stage-when {
  display: grid;
  align-content: start;
  gap: 0.2rem;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  text-transform: uppercase;
}

.stage-when b {
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 3.4rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.9;
}

.stage--current .stage-when b {
  color: var(--primary);
}

.stage-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}

.stage-kind {
  margin-right: 0.3rem;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.stage-main h3 {
  font-size: 1.35rem;
}

.stage-summary {
  max-width: 64ch;
  margin: 0.45rem 0 0;
  color: var(--text-2);
  font-size: 0.94rem;
}

.stage-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2.25rem;
  margin-top: 1.1rem;
}

.topic-label {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--primary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
}

.topic-group ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.topic-group li {
  padding: 0.22rem 0.55rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 0.82rem;
}

.stage-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  text-align: right;
}

.stage-counts {
  display: grid;
  gap: 0.2rem;
  margin: 0;
  padding: 0;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  list-style: none;
}

.stage-go {
  color: var(--text);
  font-size: 0.88rem;
  font-weight: 600;
  white-space: nowrap;
}

.stage--current .stage-go {
  color: var(--primary);
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
.references h3,
.resource-grid h3 {
  margin-bottom: 0.9rem;
  font-size: 1rem;
}

.prep-code {
  margin-top: 2rem;
}

/* Recursos */
.lost {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem 2rem;
  align-items: center;
  margin-bottom: 2.5rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.lost-title {
  font-size: 1rem;
}

.lost-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2rem;
  margin: 0;
  padding: 0;
  color: var(--text-2);
  font-size: 0.92rem;
  list-style: none;
  counter-reset: lost;
}

.lost-steps li {
  counter-increment: lost;
}

.lost-steps li::before {
  margin-right: 0.5rem;
  color: var(--primary);
  content: counter(lost) ".";
  font-family: var(--font-mono);
  font-weight: 600;
}

.lost-steps b {
  color: var(--text);
  font-weight: 600;
}

.resource-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.resource-note {
  margin: -0.4rem 0 1rem;
  font-size: 0.88rem;
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
  margin: 0;
}

.about strong {
  color: var(--text);
}

@media (max-width: 980px) {
  .stage-body {
    grid-template-columns: 7rem minmax(0, 1fr);
  }

  .stage-side {
    grid-column: 2;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    text-align: left;
  }

  .stage-counts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem 0.9rem;
  }
}

@media (max-width: 900px) {
  .prep-grid,
  .resource-grid {
    grid-template-columns: 1fr;
  }

  .lost {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .hero {
    padding-block: 1.75rem 2rem;
  }

  /* No celular o Vuati fica ao lado do título, compacto e sem a fala. */
  .hero-grid {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0 0.25rem;
    align-items: end;
  }

  .hero-copy {
    display: contents;
  }

  .hero-kicker,
  .hero-lead,
  .hero-facts {
    grid-column: 1 / -1;
  }

  .hero-title {
    grid-column: 1;
    font-size: clamp(2.5rem, 11vw, 3.1rem);
  }

  .hero-tagline {
    grid-column: 1;
    margin-top: 0.6rem;
    font-size: 1.08rem;
  }

  .hero-mascot {
    grid-column: 2;
    grid-row: 2 / span 2;
    align-self: end;
    margin-right: -2.4rem;
  }

  .hero-mascot :deep(.vuati-fala) {
    display: none;
  }

  .hero-mascot :deep(.vuati) {
    --vuati-h: 128px;
  }

  .hero-lead {
    margin-top: 0.85rem;
    font-size: 0.96rem;
  }

  .hero-facts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem 1rem;
    margin-top: 1.25rem;
  }

  .hero-facts dd {
    font-size: 0.92rem;
  }

  .hero-now {
    margin-top: 1.5rem;
  }

  .stage-body {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    padding: 1.2rem;
  }

  .stage-when {
    grid-auto-flow: column;
    justify-content: start;
    align-items: baseline;
    gap: 0.6rem;
  }

  .stage-when b {
    font-size: 2.2rem;
  }

  .stage-side {
    grid-column: 1;
  }

  .track-node {
    font-size: 0.74rem;
  }

  .track-when {
    font-size: 0.7rem;
  }
}
</style>
