import brazil from './optimized/vuati-brazil.webp'
import brazilSm from './optimized/vuati-brazil-sm.webp'
import front from './optimized/vuati-front.webp'
import frontSm from './optimized/vuati-front-sm.webp'
import side from './optimized/vuati-side.webp'
import sideSm from './optimized/vuati-side-sm.webp'

/**
 * Poses aprovadas do Vuati (edição Vue.js: o emblema do peito é desta edição).
 * Todas compartilham o mesmo canvas e o mesmo ponto de apoio no chão, então
 * podem ser trocadas sem deslocar o personagem.
 *
 * `vuati-mini` (versão simplificada) ainda não existe: os usos pequenos
 * aproveitam a variante -sm da pose correspondente. Ver README.md desta pasta.
 */
export type VuatiPose = 'front' | 'side' | 'brazil'

export const VUATI_CANVAS = { width: 703, height: 633 } as const

const SOURCES: Record<VuatiPose, { md: string; sm: string }> = {
  front: { md: front, sm: frontSm },
  side: { md: side, sm: sideSm },
  brazil: { md: brazil, sm: brazilSm },
}

export function vuatiSource(pose: VuatiPose, variant: 'md' | 'sm' = 'md'): string {
  return SOURCES[pose][variant]
}
