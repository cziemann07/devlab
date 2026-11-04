export type Status = 'rascunho' | 'em_breve' | 'publicado'
export type Origem = 'oficial' | 'demonstrativo'

export interface Disponibilidade {
  status: Status
  origem: Origem
}

export interface Site {
  cursoDestaque: string
}

/** Identidade temática de um curso. A identidade DevLab permanece neutra. */
export interface TemaCurso {
  /** Cor de destaque do curso (hex #rrggbb). */
  destaque: string
  /** Cor do texto sobre a cor de destaque (hex). Padrão: quase preto. */
  tinta?: string
  /** Exibe o mascote Vuati nesta edição. */
  mascote?: boolean
}

export type Sequencia = { horario?: string; titulo: string; detalhe?: string; grupo?: string }[]

export interface Curso {
  slug: string
  titulo: string
  /** Trecho do título destacado com a cor do curso (deve existir no título). */
  tituloDestaque?: string
  subtitulo: string
  descricao: string
  periodo: { inicio: string; fim: string }
  local?: string
  repositorioUrl?: string
  links?: { rotulo: string; url: string }[]
  /** Condição de participação exibida no topo da landing (ex.: gratuito). */
  acesso?: { rotulo: string; detalhe?: string }
  /** Aviso do curso sobre o estado do conteúdo, exibido na landing. */
  aviso?: { titulo: string; texto?: string }
  tema?: TemaCurso
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
  /** Tópicos do encontro. `grupo` agrupa tópicos consecutivos (ex.: parte teórica). */
  sequencia: Sequencia
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

/** Questionário aplicado por formulário externo. O DevLab não coleta respostas. */
export interface Questionario extends Disponibilidade {
  id: string
  tipo: 'diagnostico' | 'final'
  titulo: string
  descricao: string
  /** Link do formulário externo (https). Obrigatório quando publicado. */
  url?: string
}

export interface PerguntaDesafio {
  /** Markdown em linha. */
  enunciado: string
  /** Markdown em linha; de 2 a 6 alternativas. */
  alternativas: string[]
  /** Índice (base 0) da alternativa correta. */
  correta: number
  /** Markdown em linha explicando a resposta. */
  explicacao: string
}

/** Desafio de múltipla escolha, resolvido inteiramente no navegador. */
export interface Desafio extends Disponibilidade {
  id: string
  encontroId?: string
  titulo: string
  resumo: string
  perguntas: PerguntaDesafio[]
}

export interface CourseContent {
  curso: Curso
  encontros: Encontro[]
  materiais: Material[]
  exercicios: Exercicio[]
  codigos: Codigo[]
  questionarios?: Questionario[]
  desafios?: Desafio[]
}

export interface RenderedCurso {
  slug: string
  titulo: string
  tituloDestaque?: string
  subtitulo: string
  descricao: string
  periodo: { inicio: string; fim: string }
  local?: string
  repositorioUrl?: string
  links: { rotulo: string; url: string }[]
  acesso?: { rotulo: string; detalhe?: string }
  aviso?: { titulo: string; texto?: string }
  tema?: TemaCurso
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
  sequencia: Sequencia
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

export interface RenderedQuestionario {
  id: string
  tipo: 'diagnostico' | 'final'
  titulo: string
  descricao: string
  disponivel: boolean
  demonstrativo: boolean
  /** Presente apenas quando publicado. */
  url?: string
}

export interface RenderedPergunta {
  enunciadoHtml: string
  alternativasHtml: string[]
  correta: number
  explicacaoHtml: string
}

export interface RenderedDesafio {
  id: string
  encontroId?: string
  titulo: string
  resumo: string
  disponivel: boolean
  demonstrativo: boolean
  /** Vazio quando o desafio não está publicado. */
  perguntas: RenderedPergunta[]
  totalPerguntas: number
}

export interface RenderedCourseContent {
  curso: RenderedCurso
  encontros: RenderedEncontro[]
  materiais: RenderedMaterial[]
  exercicios: RenderedExercicio[]
  codigos: RenderedCodigo[]
  questionarios: RenderedQuestionario[]
  desafios: RenderedDesafio[]
}

export interface SiteData {
  site: Site
  cursos: RenderedCourseContent[]
}
