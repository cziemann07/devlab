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
  available: boolean
  demonstrativo: boolean
  badge?: string
  badgeVariant?: 'default' | 'primary' | 'warn' | 'info'
}
