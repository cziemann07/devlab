<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getCourse } from '../content'
import { useProgress } from '../composables/useProgress'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()
const course = computed(() => getCourse(typeof route.params.slug === 'string' ? route.params.slug : undefined))
const challenges = computed(() => route.name === 'programming-challenges')
const filter = ref('')
const { isComplete, storageAvailable } = useProgress()
const tasks = computed(() => course.value?.exercicios.filter(item => item.disponivel && (item.tipo === 'desafio') === challenges.value) ?? [])
const visible = computed(() => tasks.value.filter(item => !filter.value || item.encontroId === filter.value))
const count = computed(() => tasks.value.filter(item => isComplete(course.value!.curso.slug, item.id)).length)
</script>

<template>
  <section v-if="course" class="container practice">
    <p class="eyebrow">{{ course.curso.titulo }} · prática</p>
    <h1>{{ challenges ? 'Desafios de programação' : 'Atividades práticas' }}</h1>
    <p class="lead">{{ challenges ? 'Amplie o que construiu em aula com desafios complementares.' : 'Pratique uma etapa por vez e acompanhe seu progresso.' }}</p>
    <p role="status">{{ count }}/{{ tasks.length }} concluídos · marcação manual, sem correção automática.</p>
    <nav class="actions" aria-label="Tipo de prática">
      <RouterLink class="btn btn-sm" :to="`/cursos/${course.curso.slug}/atividades`">Atividades</RouterLink>
      <RouterLink class="btn btn-sm" :to="`/cursos/${course.curso.slug}/desafios`">Desafios de programação</RouterLink>
      <RouterLink class="btn btn-sm" to="/playground">Playground</RouterLink>
    </nav>
    <label class="filter">Filtrar por aula
      <select v-model="filter" aria-label="Filtrar por aula">
        <option value="">Todas as aulas</option>
        <option v-for="encounter in course.encontros.filter(item => item.tipo === 'encontro')" :key="encounter.id" :value="encounter.id">Aula {{ encounter.id }}</option>
      </select>
    </label>
    <div class="cards">
      <article v-for="task in visible" :key="task.id">
        <p class="eyebrow">Aula {{ task.encontroId }} · {{ task.codigo }}</p>
        <h2><RouterLink :to="`/cursos/${course.curso.slug}/exercicios/${task.id}`">{{ task.titulo }}</RouterLink></h2>
        <p>{{ task.resumo }}</p>
        <p>{{ isComplete(course.curso.slug, task.id) ? 'Concluído' : 'Pendente' }}</p>
        <RouterLink class="btn btn-sm" :to="`/cursos/${course.curso.slug}/exercicios/${task.id}`">Abrir {{ task.tipo === 'desafio' ? 'desafio' : 'atividade' }}</RouterLink>
      </article>
    </div>
    <p v-if="!visible.length">Nenhuma atividade publicada para este filtro.</p>
    <p class="note">{{ storageAvailable ? 'O progresso fica salvo somente neste navegador.' : 'O armazenamento não está disponível. O progresso vale apenas durante esta sessão.' }}</p>
    <template v-if="challenges">
      <h2>Revisão com perguntas</h2>
      <p>Os questionários de revisão continuam disponíveis separadamente.</p>
      <p v-for="quiz in course.desafios.filter(item => item.disponivel)" :key="quiz.id"><RouterLink :to="`/cursos/${course.curso.slug}/desafios/${quiz.id}`">{{ quiz.titulo }}</RouterLink></p>
    </template>
  </section>
  <NotFoundView v-else />
</template>

<style scoped>
.practice { padding-block: 3rem; }
.actions { display: flex; flex-wrap: wrap; gap: .65rem; margin-block: 1.25rem; }
.filter { display: flex; align-items: center; gap: .75rem; margin-block: 1.5rem; }
select { padding: .5rem; background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: var(--radius-sm); font: inherit; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 1rem; }
article { padding: 1.25rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); }
h2 { font-size: 1.2rem; }
.note { margin-top: 1.5rem; color: var(--text-2); }
</style>
