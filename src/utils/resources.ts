import type {
  RenderedDesafio,
  RenderedExercicio,
  RenderedMaterial,
  RenderedQuestionario,
  TipoMaterial,
} from '../types/content'
import type { ResourceItem } from '../types/ui'
import { formatDuration } from './date'

const MATERIAL_LABELS: Record<TipoMaterial, string> = {
  slides: 'Slides',
  pdf: 'PDF',
  tutorial: 'Tutorial',
  referencia: 'Referência',
  link: 'Link',
}

const MATERIAL_ICONS: Record<TipoMaterial, string> = {
  slides: 'SLD',
  pdf: 'PDF',
  tutorial: 'DOC',
  referencia: 'REF',
  link: 'URL',
}

const LEVEL_LABELS = {
  introdutorio: 'introdutório',
  intermediario: 'intermediário',
} as const

function hostname(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return undefined
  }
}

export function materialToResource(material: RenderedMaterial): ResourceItem {
  const label = MATERIAL_LABELS[material.tipo]
  const location = material.href
    ? material.external
      ? hostname(material.href)
      : 'arquivo local'
    : undefined
  const meta = location ? `${label} · ${location}` : label

  return {
    key: material.id,
    icon: MATERIAL_ICONS[material.tipo],
    titulo: material.titulo,
    descricao: material.descricao,
    meta,
    href: material.href,
    downloadHref: material.downloadHref,
    external: material.external,
    newTab: Boolean(material.href),
    available: material.disponivel,
    demonstrativo: material.demonstrativo,
  }
}

export function exerciseToResource(
  exercise: RenderedExercicio,
  courseSlug: string,
): ResourceItem {
  const metaParts = [
    formatDuration(exercise.duracaoMin),
    exercise.nivel ? LEVEL_LABELS[exercise.nivel] : '',
  ].filter(Boolean)

  let badge: string | undefined
  let badgeVariant: ResourceItem['badgeVariant']

  if (exercise.disponivel && exercise.resolucao) {
    if (exercise.resolucao.disponivel) {
      badge = 'resolução disponível'
      badgeVariant = 'primary'
    } else {
      badge = 'resolução em breve'
      badgeVariant = 'default'
    }
  }

  return {
    key: exercise.id,
    icon: exercise.codigo,
    titulo: exercise.titulo,
    descricao: exercise.resumo,
    meta: metaParts.join(' · '),
    to: exercise.disponivel
      ? `/cursos/${courseSlug}/exercicios/${exercise.id}`
      : undefined,
    available: exercise.disponivel,
    demonstrativo: exercise.demonstrativo,
    badge,
    badgeVariant,
  }
}

export function challengeToResource(challenge: RenderedDesafio, courseSlug: string): ResourceItem {
  return {
    key: `desafio-${challenge.id}`,
    icon: 'QZ',
    titulo: challenge.titulo,
    descricao: challenge.resumo,
    meta: `Desafio · ${challenge.totalPerguntas} perguntas`,
    to: challenge.disponivel ? `/cursos/${courseSlug}/desafios/${challenge.id}` : undefined,
    available: challenge.disponivel,
    demonstrativo: challenge.demonstrativo,
  }
}

const QUESTIONNAIRE_META = {
  diagnostico: 'Antes do minicurso · formulário externo',
  final: 'Depois do minicurso · formulário externo',
} as const

export function questionnaireToResource(questionnaire: RenderedQuestionario): ResourceItem {
  return {
    key: `questionario-${questionnaire.id}`,
    icon: questionnaire.tipo === 'diagnostico' ? 'Q1' : 'Q2',
    titulo: questionnaire.titulo,
    descricao: questionnaire.descricao,
    meta: QUESTIONNAIRE_META[questionnaire.tipo],
    href: questionnaire.url,
    external: true,
    acao: 'Responder',
    available: questionnaire.disponivel,
    demonstrativo: questionnaire.demonstrativo,
  }
}
