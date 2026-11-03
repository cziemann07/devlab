import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type {
  Codigo,
  CourseContent,
  Encontro,
  Exercicio,
  Material,
  RenderedCodigo,
  RenderedCourseContent,
  RenderedEncontro,
  RenderedExercicio,
  RenderedMaterial,
  RenderedResolucao,
  Site,
  SiteData,
} from '../../src/types/content'
import { createRenderer, type Renderer } from './render'

function publicHref(arquivo: string): string {
  return encodeURI(arquivo.replace(/^\/+/, ''))
}

function isDemonstrativo(item: { origem: string }): boolean {
  return item.origem === 'demonstrativo'
}

function isVisible(encounter: Encontro | undefined): boolean {
  return Boolean(encounter && encounter.status !== 'rascunho')
}

function renderEncounter(
  encounter: Encontro,
  courseDir: string,
  renderer: Renderer,
): RenderedEncontro {
  const available = encounter.status === 'publicado'
  return {
    id: encounter.id,
    tipo: encounter.tipo,
    titulo: encounter.titulo,
    resumo: encounter.resumo,
    data: encounter.data,
    horario: encounter.horario,
    local: encounter.local,
    descricaoHtml:
      available && encounter.descricao
        ? renderer.markdown(readFileSync(join(courseDir, encounter.descricao), 'utf8'))
        : undefined,
    sequencia: available ? encounter.sequencia : [],
    disponivel: available,
    demonstrativo: isDemonstrativo(encounter),
  }
}

function renderMaterial(material: Material): RenderedMaterial {
  const available = material.status === 'publicado'
  let href: string | undefined
  let downloadHref: string | undefined
  let external = false

  if (available && material.localizacao) {
    if ('arquivo' in material.localizacao) {
      href = publicHref(material.localizacao.arquivo)
      if (material.tipo === 'pdf') downloadHref = href
    } else {
      href = material.localizacao.url
      external = true
    }
  }

  return {
    id: material.id,
    encontroId: material.encontroId,
    titulo: material.titulo,
    tipo: material.tipo,
    descricao: material.descricao,
    disponivel: available,
    demonstrativo: isDemonstrativo(material),
    href,
    downloadHref,
    external,
  }
}

function renderCode(
  code: Codigo,
  courseDir: string,
  renderer: Renderer,
): RenderedCodigo {
  const available = code.status === 'publicado'
  let fonte: string | undefined
  let html: string | undefined

  if (available) {
    if (code.fonte !== undefined) {
      fonte = code.fonte
    } else if (code.arquivo) {
      fonte = readFileSync(join(courseDir, code.arquivo), 'utf8')
    }
    if (fonte !== undefined) {
      html = renderer.code(fonte, code.linguagem)
    }
  }

  return {
    id: code.id,
    titulo: code.titulo,
    descricao: code.descricao,
    linguagem: code.linguagem,
    papel: code.papel,
    encontroId: code.encontroId,
    disponivel: available,
    demonstrativo: isDemonstrativo(code),
    githubUrl: available ? code.githubUrl : undefined,
    html,
    fonte,
  }
}

function renderResolution(
  exercise: Exercicio,
  courseDir: string,
  renderer: Renderer,
  codes: Map<string, RenderedCodigo>,
): RenderedResolucao | undefined {
  const resolution = exercise.resolucao
  if (!resolution || resolution.status === 'rascunho') return undefined

  if (resolution.status === 'em_breve') {
    return {
      disponivel: false,
      demonstrativo: isDemonstrativo(resolution),
      codigos: [],
    }
  }

  return {
    disponivel: true,
    demonstrativo: isDemonstrativo(resolution),
    explicacaoHtml: resolution.explicacao
      ? renderer.markdown(readFileSync(join(courseDir, resolution.explicacao), 'utf8'))
      : undefined,
    codigos: (resolution.codigoIds ?? [])
      .map((id) => codes.get(id))
      .filter((code): code is RenderedCodigo => Boolean(code)),
  }
}

function renderExercise(
  exercise: Exercicio,
  courseDir: string,
  renderer: Renderer,
  codes: Map<string, RenderedCodigo>,
): RenderedExercicio {
  const available = exercise.status === 'publicado'

  if (!available) {
    return {
      id: exercise.id,
      encontroId: exercise.encontroId,
      codigo: exercise.codigo,
      titulo: exercise.titulo,
      resumo: exercise.resumo,
      duracaoMin: exercise.duracaoMin,
      nivel: exercise.nivel,
      disponivel: false,
      demonstrativo: isDemonstrativo(exercise),
      codigoInicial: [],
    }
  }

  return {
    id: exercise.id,
    encontroId: exercise.encontroId,
    codigo: exercise.codigo,
    titulo: exercise.titulo,
    resumo: exercise.resumo,
    duracaoMin: exercise.duracaoMin,
    nivel: exercise.nivel,
    disponivel: true,
    demonstrativo: isDemonstrativo(exercise),
    enunciadoHtml: exercise.enunciado
      ? renderer.markdown(readFileSync(join(courseDir, exercise.enunciado), 'utf8'))
      : undefined,
    objetivos: exercise.objetivos,
    requisitos: exercise.requisitos,
    dicasHtml: exercise.dicas?.map((hint) => renderer.inlineMarkdown(hint)),
    codigoInicial: (exercise.codigoInicialIds ?? [])
      .map((id) => codes.get(id))
      .filter((code): code is RenderedCodigo => Boolean(code)),
    resolucao: renderResolution(exercise, courseDir, renderer, codes),
  }
}

export async function renderContent(
  site: Site,
  courses: CourseContent[],
  contentRoot: string,
): Promise<SiteData> {
  const renderer = await createRenderer()

  const renderedCourses: RenderedCourseContent[] = courses.map((course) => {
    const courseDir = join(contentRoot, 'cursos', course.curso.slug)
    const activeEncounters = course.encontros.filter((encounter) => encounter.status !== 'rascunho')
    const activeEncounterIds = new Set(activeEncounters.map((encounter) => encounter.id))

    const visibleMaterials = course.materiais.filter((material) => {
      if (material.status === 'rascunho') return false
      if (material.encontroId && !activeEncounterIds.has(material.encontroId)) return false
      return true
    })
    const visibleExercises = course.exercicios.filter((exercise) => {
      if (exercise.status === 'rascunho') return false
      if (!activeEncounterIds.has(exercise.encontroId)) return false
      return true
    })
    const visibleCodes = course.codigos.filter((code) => {
      if (code.status === 'rascunho') return false
      if (code.encontroId && !activeEncounterIds.has(code.encontroId)) return false
      return true
    })

    const codeMap = new Map(
      visibleCodes.map((code) => [code.id, renderCode(code, courseDir, renderer)]),
    )

    return {
      curso: {
        slug: course.curso.slug,
        titulo: course.curso.titulo,
        subtitulo: course.curso.subtitulo,
        descricao: course.curso.descricao,
        periodo: course.curso.periodo,
        local: course.curso.local,
        repositorioUrl: course.curso.repositorioUrl,
        links: course.curso.links ?? [],
      },
      encontros: activeEncounters.map((encounter) =>
        renderEncounter(encounter, courseDir, renderer),
      ),
      materiais: visibleMaterials.map(renderMaterial),
      exercicios: visibleExercises.map((exercise) =>
        renderExercise(exercise, courseDir, renderer, codeMap),
      ),
      codigos: [...codeMap.values()],
    }
  })

  return { site, cursos: renderedCourses }
}
