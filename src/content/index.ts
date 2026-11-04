import data from 'virtual:devlab-content'
import type {
  RenderedCodigo,
  RenderedCourseContent,
  RenderedDesafio,
  RenderedEncontro,
  RenderedExercicio,
  RenderedMaterial,
  Site,
} from '../types/content'

export const site: Site = data.site
export const courses: RenderedCourseContent[] = data.cursos

export function getCourse(slug?: string): RenderedCourseContent | undefined {
  const target = slug ?? site.cursoDestaque
  return courses.find((course) => course.curso.slug === target)
}

export function getEncounter(
  course: RenderedCourseContent,
  id: string,
): RenderedEncontro | undefined {
  return course.encontros.find((encounter) => encounter.id === id)
}

export function getExercise(
  course: RenderedCourseContent,
  id: string,
): RenderedExercicio | undefined {
  return course.exercicios.find((exercise) => exercise.id === id)
}

export function getMaterial(
  course: RenderedCourseContent,
  id: string,
): RenderedMaterial | undefined {
  return course.materiais.find((material) => material.id === id)
}

export function getCode(
  course: RenderedCourseContent,
  id: string,
): RenderedCodigo | undefined {
  return course.codigos.find((code) => code.id === id)
}

export function materialsFor(
  course: RenderedCourseContent,
  encounterId?: string,
): RenderedMaterial[] {
  return course.materiais.filter((material) => material.encontroId === encounterId)
}

export function exercisesFor(
  course: RenderedCourseContent,
  encounterId: string,
): RenderedExercicio[] {
  return course.exercicios.filter((exercise) => exercise.encontroId === encounterId)
}

export function codesFor(
  course: RenderedCourseContent,
  encounterId?: string,
): RenderedCodigo[] {
  return course.codigos.filter((code) => code.encontroId === encounterId)
}

export function generalReferences(course: RenderedCourseContent): RenderedMaterial[] {
  return course.materiais.filter((material) => !material.encontroId)
}

export function orderedStages(course: RenderedCourseContent): RenderedEncontro[] {
  const preparation = course.encontros.filter((encounter) => encounter.tipo === 'preparacao')
  const meetings = course.encontros
    .filter((encounter) => encounter.tipo === 'encontro')
    .sort((a, b) => (a.data ?? '').localeCompare(b.data ?? ''))
  return [...preparation, ...meetings]
}

export function exercisesOfEncounter(
  course: RenderedCourseContent,
  encounterId: string,
): RenderedExercicio[] {
  return course.exercicios.filter((exercise) => exercise.encontroId === encounterId)
}

export function getChallenge(
  course: RenderedCourseContent,
  id: string,
): RenderedDesafio | undefined {
  return course.desafios.find((challenge) => challenge.id === id)
}

export function challengesFor(
  course: RenderedCourseContent,
  encounterId: string,
): RenderedDesafio[] {
  return course.desafios.filter((challenge) => challenge.encontroId === encounterId)
}

export function coursePath(course: RenderedCourseContent, ...parts: string[]): string {
  return ['', 'cursos', course.curso.slug, ...parts].join('/')
}
