import { createRouter, createWebHashHistory } from 'vue-router'
import { getChallenge, getCourse, getEncounter, getExercise } from './content'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/CourseLanding.vue'),
    },
    {
      path: '/cursos/:slug',
      name: 'course',
      component: () => import('./views/CourseLanding.vue'),
    },
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
    if (to.hash) return { el: to.hash, top: 88 }
    return { top: 0 }
  },
})

const notFoundTitle = 'Página não encontrada — DevLab'

router.afterEach((to) => {
  const slug = typeof to.params.slug === 'string' ? to.params.slug : undefined
  const course = getCourse(slug)

  if (to.name === 'not-found') {
    document.title = notFoundTitle
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
