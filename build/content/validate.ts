import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import type { CourseContent, Site } from '../../src/types/content'

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/
const QUESTIONNAIRE_TYPES = new Set(['diagnostico', 'final'])
const SUPPORTED_LANGUAGES = new Set(['vue', 'ts', 'js', 'html', 'css', 'bash', 'json'])

type Rule = `V${number}` | 'W'

interface Issue {
  kind: 'erro' | 'aviso'
  rule: Rule
  curso: string
  entidade: string
  id: string
  campo?: string
  problema: string
}

export interface ValidationResult {
  errors: string[]
  warnings: string[]
}

function formatIssue(issue: Issue): string {
  const prefix = issue.kind === 'erro' ? `ERRO ${issue.rule}` : 'AVISO'
  const field = issue.campo ? ` › ${issue.campo}` : ''
  return `[devlab:content] ${prefix} · ${issue.curso} › ${issue.entidade} "${issue.id}"${field}\n  ${issue.problema}`
}

function isValidDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

function listFiles(dir: string): string[] {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return []
  return readdirSync(dir)
}

function hasMdRecursive(dir: string): string[] {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return []
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name)
}

export function validateContent(
  site: Site,
  courses: CourseContent[],
  contentRoot: string,
  publicRoot: string,
): ValidationResult {
  const issues: Issue[] = []
  const seenSlugs = new Set<string>()

  const add = (
    rule: Rule,
    curso: string,
    entidade: string,
    id: string,
    campo: string | undefined,
    problema: string,
  ) => {
    issues.push({
      kind: rule === 'W' ? 'aviso' : 'erro',
      rule,
      curso,
      entidade,
      id,
      campo,
      problema,
    })
  }

  const addError = (
    rule: Rule,
    curso: string,
    entidade: string,
    id: string,
    campo: string | undefined,
    problema: string,
  ) => add(rule, curso, entidade, id, campo, problema)

  const addWarning = (curso: string, entidade: string, id: string, campo: string | undefined, problema: string) =>
    add('W', curso, entidade, id, campo, problema)

  const duplicateIds = (course: CourseContent, entity: string, ids: string[]) => {
    const seen = new Set<string>()
    for (const id of ids) {
      if (seen.has(id)) {
        addError(
          'V1',
          course.curso.slug,
          entity,
          id,
          'id',
          `O id "${id}" está duplicado entre ${entity}s deste curso.`,
        )
      }
      seen.add(id)
    }
  }

  for (const course of courses) {
    const { slug } = course.curso
    if (seenSlugs.has(slug)) {
      addError('V1', slug, 'curso', slug, 'slug', `O slug "${slug}" está duplicado entre cursos.`)
    }
    seenSlugs.add(slug)

    if (!KEBAB_CASE.test(slug)) {
      addError('V2', slug, 'curso', slug, 'slug', 'Use kebab-case: apenas letras minúsculas, números e hífens.')
    }

    const courseDir = join(contentRoot, 'cursos', slug)
    const encounters = course.encontros
    const materials = course.materiais
    const exercises = course.exercicios
    const codes = course.codigos
    const questionnaires = course.questionarios ?? []
    const challenges = course.desafios ?? []

    const encounterById = new Map(encounters.map((item) => [item.id, item]))
    const codeById = new Map(codes.map((item) => [item.id, item]))
    const exerciseById = new Map(exercises.map((item) => [item.id, item]))
    const encounterIds = encounters.map((item) => item.id)
    const codeIds = codes.map((item) => item.id)

    duplicateIds(course, 'encontro', encounterIds)
    duplicateIds(course, 'material', materials.map((item) => item.id))
    duplicateIds(course, 'exercicio', exercises.map((item) => item.id))
    duplicateIds(course, 'codigo', codeIds)
    duplicateIds(course, 'questionario', questionnaires.map((item) => item.id))
    duplicateIds(course, 'desafio', challenges.map((item) => item.id))

    for (const [entity, items] of [
      ['encontro', encounters],
      ['material', materials],
      ['exercicio', exercises],
      ['codigo', codes],
      ['questionario', questionnaires],
      ['desafio', challenges],
    ] as const) {
      for (const item of items) {
        if (!KEBAB_CASE.test(item.id)) {
          addError(
            'V2',
            slug,
            entity,
            item.id,
            'id',
            'Use kebab-case: apenas letras minúsculas, números e hífens.',
          )
        }
      }
    }

    const checkExternalUrl = (entity: string, id: string, field: string, url: string | undefined) => {
      if (url && !url.startsWith('https://')) {
        addWarning(slug, entity, id, field, `A URL externa não usa https://: ${url}`)
      }
    }

    checkExternalUrl('curso', slug, 'repositorioUrl', course.curso.repositorioUrl)
    for (const link of course.curso.links ?? []) {
      checkExternalUrl('curso', slug, 'links.url', link.url)
    }

    const { tema, tituloDestaque, titulo } = course.curso
    if (tema) {
      if (!HEX_COLOR.test(tema.destaque)) {
        addError('V11', slug, 'curso', slug, 'tema.destaque', `Cor inválida: "${tema.destaque}". Use hex no formato #rrggbb.`)
      }
      if (tema.tinta && !HEX_COLOR.test(tema.tinta)) {
        addError('V11', slug, 'curso', slug, 'tema.tinta', `Cor inválida: "${tema.tinta}". Use hex no formato #rrggbb.`)
      }
    }
    if (tituloDestaque && !titulo.includes(tituloDestaque)) {
      addError('V11', slug, 'curso', slug, 'tituloDestaque', `"${tituloDestaque}" não aparece no título "${titulo}".`)
    }

    if (!isValidDate(course.curso.periodo.inicio) || !isValidDate(course.curso.periodo.fim)) {
      addError('V10', slug, 'curso', slug, 'periodo', 'As datas do período devem usar YYYY-MM-DD e ser válidas.')
    }

    for (const encounter of encounters) {
      if (encounter.data && !isValidDate(encounter.data)) {
        addError('V10', slug, 'encontro', encounter.id, 'data', `Data inválida: "${encounter.data}". Use YYYY-MM-DD.`)
      }
      if (encounter.horario) {
        if (!TIME.test(encounter.horario.inicio) || !TIME.test(encounter.horario.fim)) {
          addError(
            'V10',
            slug,
            'encontro',
            encounter.id,
            'horario',
            `Horário inválido: "${encounter.horario.inicio}"–"${encounter.horario.fim}". Use HH:MM.`,
          )
        }
      }
      for (const [index, step] of encounter.sequencia.entries()) {
        if (step.horario && !TIME.test(step.horario)) {
          addError(
            'V10',
            slug,
            'encontro',
            encounter.id,
            `sequencia[${index}].horario`,
            `Horário inválido: "${step.horario}". Use HH:MM.`,
          )
        }
      }
      if (encounter.descricao) {
        const path = join(courseDir, encounter.descricao)
        if (!existsSync(path)) {
          addError(
            'V5',
            slug,
            'encontro',
            encounter.id,
            'descricao',
            `Arquivo Markdown não encontrado: ${encounter.descricao}.`,
          )
        }
      }
      if (encounter.status === 'publicado' && encounter.tipo === 'encontro') {
        if (!encounter.data) {
          addError('V6', slug, 'encontro', encounter.id, 'data', 'Encontro publicado exige uma data.')
        }
        if (!encounter.horario) {
          addError('V6', slug, 'encontro', encounter.id, 'horario', 'Encontro publicado exige horário de início e fim.')
        }
      }
    }

    for (const material of materials) {
      if (material.encontroId && !encounterById.has(material.encontroId)) {
        addError(
          'V4',
          slug,
          'material',
          material.id,
          'encontroId',
          `Encontro "${material.encontroId}" não existe. Encontros disponíveis: ${encounterIds.join(', ') || '(nenhum)'}.`,
        )
      }
      if (material.status === 'publicado' && !material.localizacao) {
        addError('V6', slug, 'material', material.id, 'localizacao', 'Material publicado exige localização (arquivo ou URL).')
      }
      if (material.localizacao && 'arquivo' in material.localizacao) {
        const path = join(publicRoot, material.localizacao.arquivo)
        if (!existsSync(path)) {
          addError(
            'V5',
            slug,
            'material',
            material.id,
            'localizacao.arquivo',
            `Arquivo local não encontrado em public/: ${material.localizacao.arquivo}.`,
          )
        }
      }
      if (material.localizacao && 'url' in material.localizacao) {
        checkExternalUrl('material', material.id, 'localizacao.url', material.localizacao.url)
      }
      if (material.status === 'publicado' && material.encontroId) {
        const encounter = encounterById.get(material.encontroId)
        if (encounter?.status === 'rascunho') {
          addError(
            'V7',
            slug,
            'material',
            material.id,
            'encontroId',
            `Material publicado está vinculado ao encontro em rascunho "${encounter.id}".`,
          )
        }
      }
    }

    for (const exercise of exercises) {
      if (!encounterById.has(exercise.encontroId)) {
        addError(
          'V4',
          slug,
          'exercicio',
          exercise.id,
          'encontroId',
          `Encontro "${exercise.encontroId}" não existe. Encontros disponíveis: ${encounterIds.join(', ') || '(nenhum)'}.`,
        )
      }
      if (exercise.status === 'publicado') {
        if (!exercise.enunciado) {
          addError('V6', slug, 'exercicio', exercise.id, 'enunciado', 'Exercício publicado exige enunciado.')
        }
        const encounter = encounterById.get(exercise.encontroId)
        if (encounter?.status === 'rascunho') {
          addError(
            'V7',
            slug,
            'exercicio',
            exercise.id,
            'encontroId',
            `Exercício publicado está vinculado ao encontro em rascunho "${encounter.id}".`,
          )
        }
      }
      if (exercise.enunciado) {
        const path = join(courseDir, exercise.enunciado)
        if (!existsSync(path)) {
          addError(
            'V5',
            slug,
            'exercicio',
            exercise.id,
            'enunciado',
            `Arquivo Markdown não encontrado: ${exercise.enunciado}.`,
          )
        }
      }
      for (const codeId of exercise.codigoInicialIds ?? []) {
        const code = codeById.get(codeId)
        if (!code) {
          addError(
            'V4',
            slug,
            'exercicio',
            exercise.id,
            'codigoInicialIds',
            `Código "${codeId}" não existe. Códigos disponíveis: ${codeIds.join(', ') || '(nenhum)'}.`,
          )
        } else if (code.status === 'rascunho' && exercise.status === 'publicado') {
          addWarning(
            slug,
            'exercicio',
            exercise.id,
            'codigoInicialIds',
            `Referência ao código em rascunho "${codeId}"; o vínculo será omitido no site.`,
          )
        }
      }
      if (exercise.resolucao) {
        const resolution = exercise.resolucao
        if (resolution.status === 'publicado' && exercise.status !== 'publicado') {
          addError(
            'V7',
            slug,
            'resolucao',
            exercise.id,
            'status',
            `Resolução publicada em exercício não publicado ("${exercise.id}").`,
          )
        }
        if (resolution.status === 'publicado' && !resolution.explicacao) {
          addError('V6', slug, 'resolucao', exercise.id, 'explicacao', 'Resolução publicada exige explicação.')
        }
        if (resolution.explicacao) {
          const path = join(courseDir, resolution.explicacao)
          if (!existsSync(path)) {
            addError(
              'V5',
              slug,
              'resolucao',
              exercise.id,
              'explicacao',
              `Arquivo Markdown não encontrado: ${resolution.explicacao}.`,
            )
          }
        }
        for (const codeId of resolution.codigoIds ?? []) {
          const code = codeById.get(codeId)
          if (!code) {
            addError(
              'V4',
              slug,
              'resolucao',
              exercise.id,
              'codigoIds',
              `Código "${codeId}" não existe. Códigos disponíveis: ${codeIds.join(', ') || '(nenhum)'}.`,
            )
          } else if (code.status === 'rascunho') {
            addWarning(
              slug,
              'resolucao',
              exercise.id,
              'codigoIds',
              `Referência ao código em rascunho "${codeId}"; o vínculo será omitido no site.`,
            )
          }
        }
      }
    }

    for (const code of codes) {
      if (code.encontroId && !encounterById.has(code.encontroId)) {
        addError(
          'V4',
          slug,
          'codigo',
          code.id,
          'encontroId',
          `Encontro "${code.encontroId}" não existe. Encontros disponíveis: ${encounterIds.join(', ') || '(nenhum)'}.`,
        )
      }
      if (!SUPPORTED_LANGUAGES.has(code.linguagem)) {
        addError(
          'V8',
          slug,
          'codigo',
          code.id,
          'linguagem',
          `Linguagem "${code.linguagem}" não suportada. Suportadas: ${[...SUPPORTED_LANGUAGES].join(', ')}.`,
        )
      }
      if (code.arquivo && code.fonte) {
        addError('V8', slug, 'codigo', code.id, 'arquivo', 'Use apenas "arquivo" ou "fonte", nunca os dois.')
      }
      if (code.arquivo) {
        const path = join(courseDir, code.arquivo)
        if (!existsSync(path)) {
          addError('V5', slug, 'codigo', code.id, 'arquivo', `Arquivo de código não encontrado: ${code.arquivo}.`)
        }
      }
      if (code.status === 'publicado' && !code.arquivo && !code.fonte && !code.githubUrl) {
        addError(
          'V6',
          slug,
          'codigo',
          code.id,
          'arquivo',
          'Código publicado exige arquivo, fonte inline ou githubUrl.',
        )
      }
      checkExternalUrl('codigo', code.id, 'githubUrl', code.githubUrl)
      if (code.status === 'publicado' && code.encontroId) {
        const encounter = encounterById.get(code.encontroId)
        if (encounter?.status === 'rascunho') {
          addError(
            'V7',
            slug,
            'codigo',
            code.id,
            'encontroId',
            `Código publicado está vinculado ao encontro em rascunho "${encounter.id}".`,
          )
        }
      }
      if (code.status === 'publicado' && code.papel === 'final') {
        const references = exercises
          .map((exercise) => exercise.resolucao)
          .filter((resolution): resolution is NonNullable<typeof resolution> =>
            Boolean(resolution?.codigoIds?.includes(code.id)),
          )
        if (references.length > 0 && references.every((resolution) => resolution.status === 'em_breve')) {
          addError(
            'V7',
            slug,
            'codigo',
            code.id,
            'papel',
            `Código final publicado é referenciado apenas por resolução em breve; isso vazaria a solução. Publique a resolução ou o código.`,
          )
        }
      }
    }

    const seenQuestionnaireTypes = new Set<string>()
    for (const questionnaire of questionnaires) {
      if (!QUESTIONNAIRE_TYPES.has(questionnaire.tipo)) {
        addError('V8', slug, 'questionario', questionnaire.id, 'tipo', `Tipo "${questionnaire.tipo}" inválido. Use: diagnostico, final.`)
      }
      if (seenQuestionnaireTypes.has(questionnaire.tipo)) {
        addWarning(slug, 'questionario', questionnaire.id, 'tipo', `Há mais de um questionário do tipo "${questionnaire.tipo}".`)
      }
      seenQuestionnaireTypes.add(questionnaire.tipo)
      if (questionnaire.status === 'publicado' && !questionnaire.url) {
        addError('V6', slug, 'questionario', questionnaire.id, 'url', 'Questionário publicado exige o link do formulário externo.')
      }
      if (questionnaire.url && !questionnaire.url.startsWith('https://')) {
        addError('V6', slug, 'questionario', questionnaire.id, 'url', `O link do formulário deve usar https://: ${questionnaire.url}`)
      }
    }

    for (const challenge of challenges) {
      if (challenge.encontroId && !encounterById.has(challenge.encontroId)) {
        addError(
          'V4',
          slug,
          'desafio',
          challenge.id,
          'encontroId',
          `Encontro "${challenge.encontroId}" não existe. Encontros disponíveis: ${encounterIds.join(', ') || '(nenhum)'}.`,
        )
      }
      if (challenge.status === 'publicado') {
        if (challenge.perguntas.length === 0) {
          addError('V6', slug, 'desafio', challenge.id, 'perguntas', 'Desafio publicado exige ao menos uma pergunta.')
        }
        const encounter = challenge.encontroId ? encounterById.get(challenge.encontroId) : undefined
        if (encounter?.status === 'rascunho') {
          addError('V7', slug, 'desafio', challenge.id, 'encontroId', `Desafio publicado está vinculado ao encontro em rascunho "${encounter.id}".`)
        }
      }
      for (const [index, question] of challenge.perguntas.entries()) {
        const field = `perguntas[${index}]`
        if (!question.enunciado.trim()) {
          addError('V6', slug, 'desafio', challenge.id, `${field}.enunciado`, 'Pergunta sem enunciado.')
        }
        if (question.alternativas.length < 2 || question.alternativas.length > 6) {
          addError('V12', slug, 'desafio', challenge.id, `${field}.alternativas`, `Use de 2 a 6 alternativas (há ${question.alternativas.length}).`)
        }
        if (question.alternativas.some((option) => !option.trim())) {
          addError('V12', slug, 'desafio', challenge.id, `${field}.alternativas`, 'Há alternativa vazia.')
        }
        if (new Set(question.alternativas).size !== question.alternativas.length) {
          addError('V12', slug, 'desafio', challenge.id, `${field}.alternativas`, 'Há alternativas repetidas.')
        }
        if (!Number.isInteger(question.correta) || question.correta < 0 || question.correta >= question.alternativas.length) {
          addError(
            'V12',
            slug,
            'desafio',
            challenge.id,
            `${field}.correta`,
            `Índice ${question.correta} fora das alternativas (use de 0 a ${question.alternativas.length - 1}).`,
          )
        }
        if (!question.explicacao.trim()) {
          addError('V6', slug, 'desafio', challenge.id, `${field}.explicacao`, 'Explique a alternativa correta.')
        }
      }
    }

    const exerciseIds = new Set(exercises.map((item) => item.id))
    const exercisesDir = join(courseDir, 'exercicios')
    for (const entry of listFiles(exercisesDir)) {
      const entryPath = join(exercisesDir, entry)
      if (!existsSync(entryPath) || !statSync(entryPath).isDirectory()) continue
      if (exerciseIds.has(entry)) continue
      const mdFiles = hasMdRecursive(entryPath)
      if (mdFiles.length > 0) {
        addError(
          'V9',
          slug,
          'exercicio',
          entry,
          'enunciado',
          `Há arquivo(s) .md em exercicios/${entry}/ sem exercício correspondente (${mdFiles.join(', ')}).`,
        )
      }
    }

    if (!encounters.some((item) => item.status === 'publicado')) {
      addWarning(slug, 'curso', slug, 'encontros', 'Curso sem nenhum encontro publicado.')
    }
  }

  if (!seenSlugs.has(site.cursoDestaque)) {
    addError(
      'V3',
      '(site)',
      'site',
      'cursoDestaque',
      'cursoDestaque',
      `Curso em destaque "${site.cursoDestaque}" não existe. Cursos disponíveis: ${[...seenSlugs].join(', ') || '(nenhum)'}.`,
    )
  }

  const errors = issues.filter((issue) => issue.kind === 'erro').map(formatIssue)
  const warnings = issues.filter((issue) => issue.kind === 'aviso').map(formatIssue)

  return { errors, warnings }
}


