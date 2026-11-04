import { computed, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { RenderedCourseContent, RenderedEncontro } from '../types/content'
import { daysBetween, isoDateIn, middayOf } from '../utils/date'

/**
 * Momento do estudante em relação aos encontros do curso.
 *
 * O momento muda apenas a PRIORIDADE visual (o que aparece em destaque). Ele
 * nunca esconde nem bloqueia conteúdo: tudo o que está publicado continua
 * acessível pelo cronograma e pelas páginas internas.
 */
export type CourseMoment =
  | { tipo: 'antes'; proximo: RenderedEncontro; dias: number }
  | { tipo: 'hoje'; atual: RenderedEncontro; proximo?: RenderedEncontro }
  | { tipo: 'entre'; anterior: RenderedEncontro; proximo: RenderedEncontro; dias: number }
  | { tipo: 'depois'; ultimo: RenderedEncontro }
  | { tipo: 'sem-datas' }

export function datedMeetings(course: RenderedCourseContent): RenderedEncontro[] {
  return course.encontros
    .filter((item) => item.tipo === 'encontro' && item.data)
    .sort((a, b) => (a.data ?? '').localeCompare(b.data ?? ''))
}

export function momentFor(course: RenderedCourseContent, at: Date): CourseMoment {
  const meetings = datedMeetings(course)
  if (meetings.length === 0) return { tipo: 'sem-datas' }

  const today = isoDateIn(at)
  const first = meetings[0]
  const last = meetings[meetings.length - 1]

  if (today < first.data!) {
    return { tipo: 'antes', proximo: first, dias: daysBetween(today, first.data!) }
  }

  const index = meetings.findIndex((item) => item.data === today)
  if (index >= 0) {
    return { tipo: 'hoje', atual: meetings[index], proximo: meetings[index + 1] }
  }

  if (today > last.data!) return { tipo: 'depois', ultimo: last }

  const next = meetings.find((item) => item.data! > today)!
  const previous = [...meetings].reverse().find((item) => item.data! < today)!
  return { tipo: 'entre', anterior: previous, proximo: next, dias: daysBetween(today, next.data!) }
}

/**
 * Relógio da página. `?simular=YYYY-MM-DD` fixa a data (às 12h, fuso do
 * minicurso) para revisar os estados da landing sem mudar o relógio do sistema.
 */
export function useClock() {
  const route = useRoute()
  const simulated = computed(() => {
    const value = route.query.simular
    return typeof value === 'string' && middayOf(value) ? value : undefined
  })
  const now = computed(() => (simulated.value ? middayOf(simulated.value)! : new Date()))
  return { now, simulated }
}

export function useCourseMoment(course: Ref<RenderedCourseContent | undefined>) {
  const { now, simulated } = useClock()
  const moment = computed<CourseMoment>(() =>
    course.value ? momentFor(course.value, now.value) : { tipo: 'sem-datas' },
  )
  return { moment, now, simulated }
}
