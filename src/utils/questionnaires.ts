import type { RenderedCourseContent } from '../types/content'
import { isoDateIn } from './date'

/** Liberação de links na wiki pelo dia real do minicurso; simular a landing não libera formulários. */
export function availableQuestionnaires(course: RenderedCourseContent, now = new Date()) {
  const today = isoDateIn(now)
  return course.questionarios.filter(item => item.disponivel && item.url && (!item.liberarEm || today >= item.liberarEm))
}
