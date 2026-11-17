<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getCourse, unitPath } from '../content'
import { useProgress } from '../composables/useProgress'
import MissionList from '../components/MissionList.vue'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()
const course = computed(() => getCourse(typeof route.params.slug === 'string' ? route.params.slug : undefined))
const challenges = computed(() => route.name === 'programming-challenges')
const filter = ref('')
const { isComplete, storageAvailable } = useProgress()
const tasks = computed(() => course.value?.exercicios.filter(item => item.disponivel && (item.etapa === 'opcional') === challenges.value) ?? [])
const groups = computed(() => course.value?.unidades.filter(unit => (!filter.value || unit.encontroId === filter.value) && tasks.value.some(task => task.unidadeId === unit.id)) ?? [])
const count = computed(() => tasks.value.filter(item => isComplete(course.value!.curso.slug, item.id)).length)
</script>

<template>
  <section v-if="course" class="container practice">
    <p class="eyebrow">{{ course.curso.titulo }} · missões por encontro</p>
    <h1>{{ challenges ? 'Aprofundamentos opcionais' : 'Atividades práticas' }}</h1>
    <p class="lead">{{ challenges ? 'Vá além do núcleo quando quiser. Cada atividade informa se usa o playground ou o projeto local.' : 'Siga as unidades do encontro. Preveja, experimente, teste e explique o resultado.' }}</p>
    <p role="status">{{ count }}/{{ tasks.length }} concluídas · marcação manual, sem correção automática.</p>
    <nav class="actions" aria-label="Tipo de prática">
      <RouterLink class="btn btn-sm" :to="`/cursos/${course.curso.slug}/atividades`">Atividades</RouterLink>
      <RouterLink class="btn btn-sm" :to="`/cursos/${course.curso.slug}/desafios`">Opcionais</RouterLink>
      <RouterLink class="btn btn-sm" to="/playground">Playground</RouterLink>
    </nav>
    <label class="filter">Filtrar por aula
      <select v-model="filter" aria-label="Filtrar por aula">
        <option value="">Todas as aulas</option>
        <option v-for="encounter in course.encontros.filter(item => item.tipo === 'encontro')" :key="encounter.id" :value="encounter.id">Aula {{ encounter.id }}</option>
      </select>
    </label>
    <section v-for="unit in groups" :key="unit.id" class="unit-group">
      <p class="eyebrow">Encontro {{ unit.encontroId }} · Unidade {{ unit.id }}</p>
      <h2><RouterLink :to="unitPath(course, unit.id)">{{ unit.titulo }}</RouterLink></h2>
      <MissionList :course="course" :missions="tasks.filter(task => task.unidadeId === unit.id)" />
    </section>
    <p v-if="!groups.length">Nenhuma missão para este filtro.</p>
    <p class="note">{{ storageAvailable ? 'O progresso fica salvo somente neste navegador.' : 'O armazenamento não está disponível. O progresso vale apenas durante esta sessão.' }}</p>
  </section>
  <NotFoundView v-else />
</template>

<style scoped>
.practice { padding-block: 3rem; max-width: 960px; }
.actions { display: flex; flex-wrap: wrap; gap: .65rem; margin-block: 1.25rem; }
.filter { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem; margin-block: 1.5rem; }
select { padding: .5rem; background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: var(--radius-sm); font: inherit; }
.unit-group { margin-block: 2rem; }
h2 { font-size: 1.4rem; }
h2 a { color: var(--text); }
.note { margin-top: 1.5rem; color: var(--text-2); }
</style>
