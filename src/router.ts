import { createRouter, createWebHashHistory } from 'vue-router'
import { getChallenge, getCourse, getEncounter, getExercise } from './content'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/atividades', redirect: '/cursos/vue-github/atividades' },
    { path: '/desafios', redirect: to => ({ path: '/cursos/vue-github/atividades', query: to.query }) },
    { path: '/aula/1', redirect: '/cursos/vue-github/encontros/01' },
    { path: '/aula/2', redirect: '/cursos/vue-github/encontros/02' },
    { path: '/cursos/:slug/atividades', name: 'practice', component: () => import('./views/PracticeView.vue') },
    { path: '/cursos/:slug/desafios', redirect: to => ({ path: `/cursos/${to.params.slug}/atividades`, query: to.query }) },
    {
      path: '/',
      name: 'home',
      component: () => import('./views/CourseLanding.vue'),
    },
    {
      path: '/playground',
      name: 'playground',
      component: () => import('./views/PlaygroundView.vue'),
    },
    {
      path: '/cursos/:slug',
      name: 'course',
      component: () => import('./views/CourseLanding.vue'),
    },
    { path: '/cursos/:slug/unidades/:id', name: 'unit', redirect: to => {
      const course = getCourse(String(to.params.slug))
      const unit = course?.unidades.find(unit => unit.id === to.params.id)
      return unit ? { path: `/cursos/${course!.curso.slug}/encontros/${unit.encontroId}`, hash: '#conceitos' } : '/404'
    } },
    {
      path: '/cursos/:slug/encontros/:id',
      name: 'encounter',
      component: () => import('./views/EncounterView.vue'),
    },
    {
      path: '/cursos/:slug/exercicios/:id',
      name: 'exercise',
      component: () => import('./views/ExerciseView.vue'),
    },
    {
      path: '/cursos/:slug/desafios/:id',
      name: 'challenge',
      component: () => import('./views/ChallengeView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('./views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    // Âncoras dentro de uma página (ex.: #exercicios no encontro).
    if (to.hash) return { el: to.hash, top: to.name === 'encounter' && window.matchMedia('(max-width: 680px)').matches ? 190 : 88 }
    return { top: 0 }
  },
})

const notFoundTitle = 'Página não encontrada — DevLab'

router.beforeEach((to) => {
  if (to.name !== 'exercise') return
  const course = getCourse(String(to.params.slug ?? ''))
  const successor = course?.redirecionamentos[String(to.params.id ?? '')]
  if (successor) return { name: 'exercise', params: { slug: course!.curso.slug, id: successor }, replace: true }
})

router.afterEach((to) => {
  const slug = typeof to.params.slug === 'string' ? to.params.slug : undefined
  const course = getCourse(slug)

  if (to.name === 'not-found') {
    document.title = notFoundTitle
    return
  }

  if (to.name === 'playground') {
    document.title = 'Playground Vue.js — DevLab'
    return
  }

  if (to.name === 'home' || to.name === 'course') {
    document.title = course ? `${course.curso.titulo} — DevLab` : notFoundTitle
    return
  }

  if (!course) {
    document.title = notFoundTitle
    return
  }

  if (to.name === 'practice') {
    document.title = 'Atividades — DevLab'
    return
  }

  if (to.name === 'unit') {
    const unit = course.unidades.find(unit => unit.id === to.params.id)
    document.title = unit ? `Unidade ${unit.id} · ${unit.titulo} — DevLab` : notFoundTitle
    return
  }

  if (to.name === 'encounter') {
    const encounter = getEncounter(course, String(to.params.id ?? ''))
    document.title = encounter
      ? `${encounter.titulo} — ${course.curso.titulo} — DevLab`
      : notFoundTitle
    return
  }

  if (to.name === 'exercise') {
    const exercise = getExercise(course, String(to.params.id ?? ''))
    document.title = exercise
      ? `Exercício ${exercise.codigo} · ${exercise.titulo} — DevLab`
      : notFoundTitle
    return
  }

  if (to.name === 'challenge') {
    const challenge = getChallenge(course, String(to.params.id ?? ''))
    document.title = challenge
      ? `Desafio · ${challenge.titulo} — ${course.curso.titulo} — DevLab`
      : notFoundTitle
    return
  }

  document.title = 'DevLab'
})

export default router
