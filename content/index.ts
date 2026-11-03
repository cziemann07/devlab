import type { CourseContent, Site } from '../src/types/content'
import { vueGithub } from './cursos/vue-github'

export const site: Site = {
  cursoDestaque: 'vue-github',
}

export const courses: CourseContent[] = [vueGithub]
