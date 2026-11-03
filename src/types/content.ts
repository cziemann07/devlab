export type Status = 'rascunho' | 'em_breve' | 'publicado'
export type Origem = 'oficial' | 'demonstrativo'

export interface Disponibilidade {
  status: Status
  origem: Origem
}

export interface Site {
  cursoDestaque: string
}

export interface Curso {
  slug: string
  titulo: string
  subtitulo: string
  descricao: string
  periodo: { inicio: string; fim: string }
  local?: string
  repositorioUrl?: string
  links?: { rotulo: string; url: string }[]
}

export interface Encontro extends Disponibilidade {
  id: string
  tipo: 'preparacao' | 'encontro'
  titulo: string
  resumo: string
  data?: string
  horario?: { inicio: string; fim: string }
  local?: string
  descricao?: string
  sequencia: { horario?: string; titulo: string; detalhe?: string }[]
}

export type TipoMaterial = 'slides' | 'pdf' | 'tutorial' | 'referencia' | 'link'

export interface Material extends Disponibilidade {
  id: string
  encontroId?: string
  titulo: string
  tipo: TipoMaterial
  descricao?: string
  localizacao?: { arquivo: string } | { url: string }
}

export type LinguagemCodigo = 'vue' | 'ts' | 'js' | 'html' | 'css' | 'bash' | 'json'

export interface Codigo extends Disponibilidade {
  id: string
  titulo: string
  descricao?: string
  linguagem: LinguagemCodigo
  arquivo?: string
  fonte?: string
  githubUrl?: string
  papel?: 'exemplo' | 'inicial' | 'final'
  encontroId?: string
}

export interface Resolucao extends Disponibilidade {
  explicacao?: string
  codigoIds?: string[]
}

export interface Exercicio extends Disponibilidade {
  id: string
  encontroId: string
  codigo: string
  titulo: string
  resumo: string
  duracaoMin?: number
  nivel?: 'introdutorio' | 'intermediario'
  enunciado?: string
  objetivos?: string[]
  requisitos?: string[]
  codigoInicialIds?: string[]
  dicas?: string[]
  resolucao?: Resolucao
}

export interface CourseContent {
  curso: Curso
  encontros: Encontro[]
  materiais: Material[]
  exercicios: Exercicio[]
  codigos: Codigo[]
}

export interface RenderedCurso {
  slug: string
  titulo: string
  subtitulo: string
  descricao: string
  periodo: { inicio: string; fim: string }
  local?: string
  repositorioUrl?: string
  links: { rotulo: string; url: string }[]
}

export interface RenderedEncontro {
  id: string
  tipo: 'preparacao' | 'encontro'
  titulo: string
  resumo: string
  data?: string
  horario?: { inicio: string; fim: string }
  local?: string
  descricaoHtml?: string
  sequencia: { horario?: string; titulo: string; detalhe?: string }[]
  disponivel: boolean
  demonstrativo: boolean
}

export interface RenderedMaterial {
  id: string
  encontroId?: string
  titulo: string
  tipo: TipoMaterial
  descricao?: string
  disponivel: boolean
  demonstrativo: boolean
  href?: string
  downloadHref?: string
  external: boolean
}

export interface RenderedCodigo {
  id: string
  titulo: string
  descricao?: string
  linguagem: LinguagemCodigo
  papel?: 'exemplo' | 'inicial' | 'final'
  encontroId?: string
  disponivel: boolean
  demonstrativo: boolean
  githubUrl?: string
  html?: string
  fonte?: string
}

export interface RenderedResolucao {
  disponivel: boolean
  demonstrativo: boolean
  explicacaoHtml?: string
  codigos: RenderedCodigo[]
}

export interface RenderedExercicio {
  id: string
  encontroId: string
  codigo: string
  titulo: string
  resumo: string
  duracaoMin?: number
  nivel?: 'introdutorio' | 'intermediario'
  disponivel: boolean
  demonstrativo: boolean
  enunciadoHtml?: string
  objetivos?: string[]
  requisitos?: string[]
  dicasHtml?: string[]
  codigoInicial: RenderedCodigo[]
  resolucao?: RenderedResolucao
}

export interface RenderedCourseContent {
  curso: RenderedCurso
  encontros: RenderedEncontro[]
  materiais: RenderedMaterial[]
  exercicios: RenderedExercicio[]
  codigos: RenderedCodigo[]
}

export interface SiteData {
  site: Site
  cursos: RenderedCourseContent[]
}
