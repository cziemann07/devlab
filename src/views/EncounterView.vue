<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Breadcrumb from '../components/Breadcrumb.vue'
import PizzaLessonDemo from '../components/PizzaLessonDemo.vue'
import Prose from '../components/Prose.vue'
import ResourceList from '../components/ResourceList.vue'
import NotFoundView from './NotFoundView.vue'
import { getCourse, getEncounter, materialsFor, coursePath } from '../content'
import { materialToResource, questionnaireToResource } from '../utils/resources'
import { availableQuestionnaires } from '../utils/questionnaires'
import { useRealClock } from '../composables/useRealClock'
import { formatDateLong, formatTimeRange } from '../utils/date'

const route = useRoute()
const course = computed(() => getCourse(String(route.params.slug ?? '')))
const encounter = computed(() => course.value ? getEncounter(course.value, String(route.params.id ?? '')) : undefined)
const now = useRealClock()
const isPreparation = computed(() => encounter.value?.tipo === 'preparacao')
const hasPizzaWorkshop = computed(() => course.value?.curso.slug === 'vue-github' && encounter.value?.id === '01')
const materials = computed(() => course.value && encounter.value
  ? materialsFor(course.value, encounter.value.id).filter(item => item.tipo === 'pdf' || item.tipo === 'slides' || item.tipo === 'codigo').map(materialToResource) : [])
const questionnaires = computed(() => course.value && encounter.value
  ? availableQuestionnaires(course.value, now.value).filter(item => item.tipo === (encounter.value!.id === '02' ? 'final' : 'diagnostico')).map(questionnaireToResource) : [])
const firstMission = computed(() => course.value?.exercicios.find(item => item.encontroId === encounter.value?.id && item.unidadeId !== '01' && item.playgroundExemplo))
const section = (hash: string) => ({ path: route.path, hash })
</script>

<template>
  <div v-if="course && encounter" class="container encounter-page">
    <Breadcrumb :items="[{ label: course.curso.titulo, to: '/' }, { label: isPreparation ? 'Preparação' : `Aula ${encounter.id}` }]" />
    <RouterLink class="back" :to="{ path: '/', hash: '#cronograma' }">Voltar ao cronograma</RouterLink>
    <div class="lesson-layout">
    <nav class="lesson-summary" aria-label="Sumário">
      <h2><span aria-hidden="true">☷</span> Sumário</h2>
      <ol>
        <li v-for="item in encounter.sumario" :key="item.id"><RouterLink :to="section(`#${item.id}`)">{{ item.titulo }}</RouterLink></li>
        <li v-if="hasPizzaWorkshop"><RouterLink :to="section('#demonstracao')">Demonstração interativa</RouterLink></li>
        <li v-if="materials.length"><RouterLink :to="section('#materiais')">Materiais da aula</RouterLink></li>
        <li v-if="questionnaires.length"><RouterLink :to="section('#questionario')">{{ encounter.id === '02' ? 'Questionário final' : 'Questionário inicial' }}</RouterLink></li>
        <li v-if="!isPreparation"><RouterLink :to="section('#praticar')">Playground e atividades</RouterLink></li>
      </ol>
    </nav>
    <div class="lesson-content">
    <header>
      <p class="eyebrow">{{ isPreparation ? 'Antes de começar' : `Aula ${encounter.id}` }}</p>
      <h1>{{ encounter.titulo }}</h1>
      <p class="lead">{{ encounter.resumo }}</p>
      <p v-if="encounter.data" class="lesson-date">{{ formatDateLong(encounter.data) }} · {{ formatTimeRange(encounter.horario) }}</p>
    </header>
    <section id="conceitos" class="lesson-section" aria-label="Proposta e conceitos da aula">
      <Prose v-if="encounter.descricaoHtml" :html="encounter.descricaoHtml" />
    </section>
    <PizzaLessonDemo v-if="hasPizzaWorkshop" id="demonstracao" />
    <section v-if="materials.length" id="materiais" class="lesson-section" aria-labelledby="materiais-titulo">
      <h2 id="materiais-titulo">Materiais da aula {{ encounter.id }}</h2>
      <p class="muted">Os materiais desta aula também estão no Inventário.</p>
      <ResourceList :items="materials" />
    </section>
    <section v-if="questionnaires.length" id="questionario" class="lesson-section" aria-labelledby="questionario-titulo">
      <h2 id="questionario-titulo">{{ encounter.id === '02' ? 'Fechamento' : 'Antes do minicurso' }}</h2>
      <ResourceList :items="questionnaires" />
    </section>
    <section v-if="!isPreparation" id="praticar" class="lesson-section" aria-labelledby="praticar-titulo">
      <h2 id="praticar-titulo">Quer experimentar?</h2>
      <p>O playground e os exercícios continuam disponíveis como apoio. Siga a orientação da equipe sobre o que fazer durante a aula; você não precisa percorrer todos os exercícios.</p>
      <div class="lesson-actions">
        <RouterLink class="btn btn-primary" :to="{ path: '/playground', query: { exemplo: firstMission?.id } }">Abrir playground</RouterLink>
        <RouterLink class="btn" :to="{ path: coursePath(course, 'atividades'), query: { aula: encounter.id } }">Consultar exercícios da aula</RouterLink>
      </div>
    </section>
    <RouterLink class="back" :to="{ path: '/', hash: '#cronograma' }">Voltar ao cronograma</RouterLink>
    </div>
    </div>
  </div>
  <NotFoundView v-else />
</template>

<style scoped>
.encounter-page { max-width: 1160px; padding-block: 2.5rem 4rem; }
.back { display: inline-block; margin-block: 1rem 1.5rem; color: var(--text-2); font-size: .9rem; text-underline-offset: 4px; }
header { margin-bottom: 1.5rem; }
h1 { font-size: clamp(2rem, 5vw, 2.8rem); }
.lesson-date { color: var(--text-2); font-size: .9rem; }
.lesson-layout { display: grid; grid-template-columns: minmax(190px, 235px) minmax(0, 1fr); gap: clamp(1rem, 4vw, 3rem); }
.lesson-summary { position: sticky; top: calc(var(--header-height) + 1rem); align-self: start; padding: 1.25rem 1.5rem; border: 1px solid var(--border); border-left: 3px solid var(--primary); border-radius: var(--radius); background: var(--surface); }
.lesson-summary h2 { font-size: 1.1rem; margin-bottom: .65rem; }
.lesson-summary ol { display: grid; gap: .5rem; margin: 0; padding-left: 1.25rem; }
.lesson-summary a { color: var(--text); text-underline-offset: 4px; }
.lesson-section { padding-block: 1.5rem; scroll-margin-top: calc(var(--header-height) + 20px); }
.lesson-section > h2 { font-size: 1.5rem; margin-bottom: .75rem; }
.lesson-section > p { color: var(--text-2); margin-bottom: 1rem; }
.lesson-actions { display: flex; flex-wrap: wrap; gap: .7rem; margin-top: 1rem; }
.lesson-summary h2 span, .lesson-summary a:hover { color: var(--primary); }
@media (max-width: 680px) {
  .lesson-layout { grid-template-columns: minmax(0, 1fr); }
  .lesson-summary { z-index: 2; top: var(--header-height); padding: .65rem .85rem; }
  .lesson-summary ol { display: flex; flex-wrap: wrap; gap: .2rem; padding: .2rem 0; list-style: none; }
  .lesson-summary li { max-width: 100%; }
  .lesson-summary a { display: block; padding: .25rem .5rem; font-size: .85rem; background: var(--surface-2); border-radius: var(--radius-sm); }
}
@media (max-height: 560px) {
  .lesson-summary { position: static; }
}
</style>
