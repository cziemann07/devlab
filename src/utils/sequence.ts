import type { Sequencia } from '../types/content'

export interface SequenceGroup {
  grupo?: string
  itens: Sequencia
}

/** Agrupa tópicos consecutivos que compartilham o mesmo `grupo`. */
export function groupSequence(sequencia: Sequencia): SequenceGroup[] {
  const groups: SequenceGroup[] = []
  for (const step of sequencia) {
    const last = groups[groups.length - 1]
    if (last && last.grupo === step.grupo) last.itens.push(step)
    else groups.push({ grupo: step.grupo, itens: [step] })
  }
  return groups
}
