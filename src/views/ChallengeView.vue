<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Badge from '../components/Badge.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import DemoBadge from '../components/DemoBadge.vue'
import DemoNotice from '../components/DemoNotice.vue'
import EmptyState from '../components/EmptyState.vue'
import QuizRunner from '../components/QuizRunner.vue'
import NotFoundView from './NotFoundView.vue'
import { coursePath, getChallenge, getCourse, getEncounter } from '../content'

const route = useRoute()

const course = computed(() => getCourse(String(route.params.slug ?? '')))
const challenge = computed(() =>
  course.value ? getChallenge(course.value, String(route.params.id ?? '')) : undefined,
)
const encounter = computed(() =>
  course.value && challenge.value?.encontroId
    ? getEncounter(course.value, challenge.value.encontroId)
    : undefined,
)

const encounterLabel = computed(() =>
  encounter.value
    ? encounter.value.tipo === 'preparacao'
      ? 'Preparação'
      : `Encontro ${encounter.value.id}`
    : '',
)

const backPath = computed(() =>
  course.value && encounter.value?.disponivel
    ? coursePath(course.value, 'encontros', encounter.value.id)
    : '/',
)
</script>

<template>
  <template v-if="course && challenge">
    <div class="container challenge">
      <Breadcrumb
        :items="[
          { label: course.curso.titulo, to: '/' },
          ...(encounter ? [{ label: encounterLabel, to: backPath }] : []),
          { label: 'Desafio' },
        ]"
      />

      <DemoNotice v-if="challenge.demonstrativo" />

      <header class="challenge-head">
        <p class="eyebrow">Desafio rápido</p>
        <h1>{{ challenge.titulo }}</h1>
        <p class="lead">{{ challenge.resumo }}</p>
        <div class="challenge-facts">
          <Badge>{{ challenge.totalPerguntas }} perguntas</Badge>
          <Badge>sem cadastro · nada é salvo</Badge>
          <Badge v-if="!challenge.disponivel" variant="warn">em breve</Badge>
          <DemoBadge :show="challenge.demonstrativo" />
        </div>
      </header>

      <QuizRunner
        v-if="challenge.disponivel"
        :desafio="challenge"
        :mascote="Boolean(course.curso.tema?.mascote)"
      />
      <EmptyState
        v-else
        icon="…"
        titulo="Desafio em breve"
        texto="Este desafio ainda não foi publicado."
      />

      <p class="challenge-note muted">
        As respostas ficam só neste navegador e somem ao recarregar a página. Não há ranking.
      </p>

      <RouterLink class="btn btn-sm" :to="backPath">
        ← {{ encounter ? `Voltar ao ${encounterLabel}` : 'Voltar ao início' }}
      </RouterLink>
    </div>
  </template>

  <NotFoundView v-else />
</template>

<style scoped>
.challenge {
  max-width: 820px;
  padding-block: 2.5rem 5rem;
}

.challenge-head {
  margin-bottom: 2rem;
}

.challenge-head h1 {
  font-size: clamp(2rem, 5vw, 2.8rem);
}

.challenge-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.25rem;
}

.challenge-note {
  margin: 2rem 0 1rem;
  font-size: 0.84rem;
}
</style>
