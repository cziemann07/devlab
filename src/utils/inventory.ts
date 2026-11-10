import type { RenderedCourseContent, RenderedMaterial, TipoMaterial } from '../types/content'

export const inventoryCategories = [
  { id: 'todos', label: 'Tudo' },
  { id: 'slides', label: 'Slides' },
  { id: 'apostilas', label: 'Apostilas e PDFs' },
  { id: 'codigo', label: 'Código-base' },
  { id: 'apoio', label: 'Roteiros e apoio' },
] as const

export type InventoryCategory = (typeof inventoryCategories)[number]['id']

const categoryForType: Partial<Record<TipoMaterial, InventoryCategory>> = {
  slides: 'slides',
  pdf: 'apostilas',
  codigo: 'codigo',
  roteiro: 'apoio',
  tutorial: 'apoio',
}

export function inventoryMaterials(course: RenderedCourseContent): RenderedMaterial[] {
  return course.materiais.filter(
    (material) => material.encontroId !== 'preparacao' && categoryForType[material.tipo],
  )
}

export function matchesInventoryCategory(material: RenderedMaterial, category: InventoryCategory): boolean {
  return category === 'todos' || categoryForType[material.tipo] === category
}

export function inventoryTypeLabel(type: TipoMaterial): string {
  const labels: Partial<Record<TipoMaterial, string>> = {
    slides: 'Slides', pdf: 'PDF', codigo: 'Código-base', roteiro: 'Roteiro', tutorial: 'Apoio',
  }
  return labels[type] ?? 'Material'
}

export function inventoryFileLabel(material: RenderedMaterial): string {
  if (material.tipo === 'codigo') return '</>'
  if (material.tipo === 'slides') return 'SLD'
  const path = material.href?.split(/[?#]/)[0].toLowerCase()
  if (path?.endsWith('.pdf') || material.tipo === 'pdf') return 'PDF'
  if (path?.endsWith('.md')) return 'MD'
  return 'DOC'
}
