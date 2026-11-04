import type { RouteLocationRaw } from 'vue-router'
import type { VuatiPose } from '../assets/vuati'
import type { CourseMoment } from '../composables/useCourseMoment'
import { challengesFor, codesFor, coursePath, exercisesFor } from '../content'
import type { RenderedCourseContent, RenderedEncontro } from '../types/content'
import { formatDateShort, formatTimeRange } from './date'

export interface MomentAction {
  label: string
  to?: RouteLocationRaw
  href?: string
  primary?: boolean
}

export interface MomentView {
  rotulo: string
  titulo: string
  texto: string
  acoes: MomentAction[]
  pose: VuatiPose
  fala: string
}

function meetingLabel(encounter: RenderedEncontro): string {
  return `Encontro ${encounter.id}`
}

function encounterTo(
  course: RenderedCourseContent,
  encounter: RenderedEncontro,
  hash?: string,
): RouteLocationRaw | undefined {
  if (!encounter.disponivel) return undefined
  const path = coursePath(course, 'encontros', encounter.id)
  return hash ? { path, hash } : path
}

function questionnaireAction(
  course: RenderedCourseContent,
  tipo: 'diagnostico' | 'final',
): MomentAction | undefined {
  const questionnaire = course.questionarios.find((item) => item.tipo === tipo)
  if (!questionnaire?.disponivel || !questionnaire.url) return undefined
  return { label: `Responder o ${questionnaire.titulo.toLowerCase()}`, href: questionnaire.url }
}

function compact(actions: (MomentAction | undefined | false)[]): MomentAction[] {
  const list = actions.filter((action): action is MomentAction =>
    Boolean(action && (action.to || action.href)),
  )
  if (list.length > 0 && !list.some((action) => action.primary)) list[0].primary = true
  return list
}

function days(count: number): string {
  return count === 1 ? '1 dia' : `${count} dias`
}

/**
 * Traduz o momento do curso em prioridade visual: o que dizer e quais atalhos
 * oferecer. Só aponta para conteúdo disponível; nada fica escondido por data.
 */
export function describeMoment(
  course: RenderedCourseContent,
  moment: CourseMoment,
): MomentView | undefined {
  const preparation = course.encontros.find((item) => item.tipo === 'preparacao')

  switch (moment.tipo) {
    case 'antes': {
      const { proximo, dias } = moment
      return {
        rotulo: 'Antes do minicurso',
        titulo: `${dias === 1 ? 'Falta' : 'Faltam'} ${days(dias)} para o ${meetingLabel(proximo).toLowerCase()}`,
        texto: `${proximo.titulo} · ${formatDateShort(proximo.data!)} · ${formatTimeRange(proximo.horario)}. Deixe o ambiente pronto antes e confira o que acontece em cada encontro.`,
        acoes: compact([
          preparation && {
            label: 'Preparar o ambiente',
            to: encounterTo(course, preparation) ?? { path: '/', hash: '#preparacao' },
            primary: true,
          },
          questionnaireAction(course, 'diagnostico'),
          { label: `Ver o ${meetingLabel(proximo).toLowerCase()}`, to: encounterTo(course, proximo) },
        ]),
        pose: 'front',
        fala: dias === 1 ? 'É amanhã! Ambiente pronto?' : `Faltam ${days(dias)}! Já preparou o ambiente?`,
      }
    }
    case 'hoje': {
      const { atual } = moment
      const hasExercises = exercisesFor(course, atual.id).length > 0
      const hasCode = codesFor(course, atual.id).some((code) => code.disponivel)
      return {
        rotulo: `Hoje · ${formatTimeRange(atual.horario)}`,
        titulo: `${meetingLabel(atual)} · ${atual.titulo}`,
        texto:
          'Perdeu alguma etapa durante a aula? Os exercícios, as dicas e o código estão no encontro, sem precisar interromper a turma.',
        acoes: compact([
          { label: 'Abrir o encontro de hoje', to: encounterTo(course, atual), primary: true },
          hasExercises && { label: 'Exercícios', to: encounterTo(course, atual, '#exercicios') },
          hasCode && { label: 'Código', to: encounterTo(course, atual, '#codigo') },
        ]),
        pose: 'brazil',
        fala: 'Hoje tem encontro! Bora codar?',
      }
    }
    case 'entre': {
      const { anterior, proximo, dias } = moment
      const challenge = challengesFor(course, anterior.id).find((item) => item.disponivel)
      return {
        rotulo: 'Entre os encontros',
        titulo: `${meetingLabel(anterior)} concluído · próximo em ${days(dias)}`,
        texto: `Revise o que viu e chegue preparado para "${proximo.titulo}" em ${formatDateShort(proximo.data!)}, ${formatTimeRange(proximo.horario)}.`,
        acoes: compact([
          { label: `Revisar o ${meetingLabel(anterior).toLowerCase()}`, to: encounterTo(course, anterior), primary: true },
          challenge && {
            label: `Desafio do ${meetingLabel(anterior).toLowerCase()}`,
            to: coursePath(course, 'desafios', challenge.id),
          },
          { label: `Ver o ${meetingLabel(proximo).toLowerCase()}`, to: encounterTo(course, proximo) },
        ]),
        pose: 'front',
        fala: 'Revisão em dia? O próximo encontro já vem aí.',
      }
    }
    case 'depois':
      return {
        rotulo: 'Minicurso concluído',
        titulo: 'Revise quando quiser',
        texto:
          'Materiais, exercícios, desafios e códigos continuam disponíveis para você estudar no seu ritmo.',
        acoes: compact([
          questionnaireAction(course, 'final'),
          { label: 'Rever o cronograma', to: { path: '/', hash: '#cronograma' } },
          { label: 'Referências', to: { path: '/', hash: '#recursos' } },
        ]),
        pose: 'brazil',
        fala: 'Missão cumprida! Bora continuar praticando?',
      }
    default:
      return undefined
  }
}
