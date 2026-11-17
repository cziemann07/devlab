<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Breadcrumb from '../components/Breadcrumb.vue'
import Prose from '../components/Prose.vue'
import MissionList from '../components/MissionList.vue'
import ResourceList from '../components/ResourceList.vue'
import NotFoundView from './NotFoundView.vue'
import { getCourse, getMaterial, exercisesForUnit, coursePath } from '../content'
import { materialToResource } from '../utils/resources'

const route = useRoute()
const course = computed(() => getCourse(String(route.params.slug ?? '')))
const unit = computed(() => course.value?.unidades.find(item => item.id === route.params.id))
const missions = computed(() => course.value && unit.value ? exercisesForUnit(course.value, unit.value.id) : [])
const resources = computed(() => {
  if (!course.value || !unit.value) return []
  const material = getMaterial(course.value, unit.value.apostilaId)
  return material ? [materialToResource(material)] : []
})
</script>

<template>
  <div v-if="course && unit" class="container unit-page">
    <Breadcrumb :items="[{ label: course.curso.titulo, to: '/' }, { label: `Encontro ${unit.encontroId}`, to: coursePath(course, 'encontros', unit.encontroId) }, { label: `Unidade ${unit.id}` }]" />
    <header>
      <p class="eyebrow">Encontro {{ unit.encontroId }} · Unidade {{ unit.id }}</p>
      <h1>{{ unit.titulo }}</h1>
      <p class="lead">{{ unit.resumo }}</p>
      <nav class="unit-actions" aria-label="Nesta unidade">
        <RouterLink class="btn btn-primary" :to="{ path: route.path, hash: '#missoes' }">Ver missões</RouterLink>
        <RouterLink class="btn" :to="{ path: route.path, hash: '#estudo' }">Ler material de estudo</RouterLink>
        <RouterLink class="btn" :to="coursePath(course, 'encontros', unit.encontroId)">Voltar ao encontro</RouterLink>
      </nav>
    </header>
    <section aria-label="Apostila da unidade"><ResourceList :items="resources" /></section>
    <section id="missoes" class="unit-section">
      <h2>Missões da unidade</h2>
      <p>Comece pelo código inicial. As missões de progressão e os opcionais permitem aprofundar o estudo no seu ritmo.</p>
      <MissionList :course="course" :missions="missions" />
    </section>
    <section id="estudo" class="unit-section">
      <h2>Material de estudo</h2>
      <Prose :html="unit.descricaoHtml" />
    </section>
    <RouterLink class="btn" :to="coursePath(course, 'encontros', unit.encontroId)">Voltar ao encontro {{ unit.encontroId }}</RouterLink>
  </div>
  <NotFoundView v-else />
</template>

<style scoped>
.unit-page { max-width: 960px; padding-block: 2.5rem 4rem; }
header { margin-bottom: 2rem; }
h1 { font-size: clamp(2rem, 5vw, 3rem); }
.unit-actions { display: flex; gap: .7rem; flex-wrap: wrap; margin-block: 1.5rem; }
.unit-section { padding-block: 2rem; scroll-margin-top: calc(var(--header-height) + 20px); }
h2 { margin-bottom: 1rem; }
.unit-section > p { color: var(--text-2); }
</style>
