<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { stageLabel } from '../content'
import { useProgress } from '../composables/useProgress'
import type { RenderedCourseContent, RenderedExercicio } from '../types/content'

defineProps<{ course: RenderedCourseContent; missions: RenderedExercicio[] }>()
const { isComplete } = useProgress()
</script>

<template>
  <ol class="mission-list">
    <li v-for="mission in missions" :key="mission.id">
      <span class="mission-code">{{ mission.codigo }}</span>
      <div>
        <RouterLink class="mission-title" :to="`/cursos/${course.curso.slug}/exercicios/${mission.id}`">{{ mission.titulo }}</RouterLink>
        <p>{{ mission.resumo }}</p>
        <small>{{ stageLabel(mission.etapa) }} · {{ mission.playgroundExemplo ? 'Playground' : 'Projeto local' }} · {{ isComplete(course.curso.slug, mission.id) ? 'Concluída' : 'Pendente' }}</small>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.mission-list { margin: 1.25rem 0; padding: 0; list-style: none; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
li { display: grid; grid-template-columns: 3rem minmax(0, 1fr); gap: .85rem; padding: 1.1rem; background: var(--surface); }
li + li { border-top: 1px solid var(--border); }
.mission-code { color: var(--primary); font-family: var(--font-mono); font-size: .8rem; padding-top: .15rem; }
.mission-title { font-weight: 600; color: var(--text); text-underline-offset: 4px; }
p { margin: .4rem 0; font-size: .9rem; color: var(--text-2); }
small { font-size: .78rem; color: var(--text-2); }
.mission-title:focus-visible { outline-offset: 2px; }
</style>
