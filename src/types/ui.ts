export interface ResourceItem {
  key: string
  icon: string
  titulo: string
  meta?: string
  descricao?: string
  to?: string
  href?: string
  downloadHref?: string
  external?: boolean
  /** Abre `href` em nova aba (externos e arquivos locais, como PDFs). */
  newTab?: boolean
  /** Rótulo da ação de `href` (padrão: "Abrir" para externos, "Ver" para locais). */
  acao?: string
  available: boolean
  demonstrativo: boolean
  badge?: string
  badgeVariant?: 'default' | 'primary' | 'warn' | 'info'
}
