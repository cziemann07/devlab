import type { RenderedEncontro } from '../types/content'

const TIME_ZONE = 'America/Sao_Paulo'

function partsFor(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    time: `${get('hour')}:${get('minute')}`,
  }
}

function dateFromIso(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`)
}

export function formatDateLong(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: TIME_ZONE,
  }).format(dateFromIso(iso))
}

export function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: TIME_ZONE,
  })
    .format(dateFromIso(iso))
    .replace('.', '')
}

/** "24 e 26 de novembro" (mesmo mês) ou "28 de novembro e 2 de dezembro". */
export function formatDayList(isos: string[]): string {
  const month = (iso: string) =>
    new Intl.DateTimeFormat('pt-BR', { month: 'long', timeZone: TIME_ZONE }).format(dateFromIso(iso))
  const day = (iso: string) => String(Number(iso.slice(8, 10)))
  const join = (items: string[]) =>
    items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`
  if (isos.length === 0) return ''
  const sameMonth = isos.every((iso) => iso.slice(0, 7) === isos[0].slice(0, 7))
  if (sameMonth) return `${join(isos.map(day))} de ${month(isos[0])}`
  return join(isos.map((iso) => `${day(iso)} de ${month(iso)}`))
}

export function formatDay(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    timeZone: TIME_ZONE,
  }).format(dateFromIso(iso))
}

export function formatMonth(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    timeZone: TIME_ZONE,
  })
    .format(dateFromIso(iso))
    .replace('.', '')
    .toUpperCase()
}

export function formatWeekday(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    timeZone: TIME_ZONE,
  })
    .format(dateFromIso(iso))
    .replace('.', '')
}

function clock(value: string): string {
  const [hour, minute] = value.split(':')
  return minute === '00' ? `${hour}h` : `${hour}h${minute}`
}

export function formatTimeRange(horario?: { inicio: string; fim: string }): string {
  if (!horario) return ''
  return `${clock(horario.inicio)} – ${clock(horario.fim)}`
}

export function formatDuration(minutes?: number): string {
  return minutes ? `~${minutes} min` : ''
}

export type TemporalStatus = 'hoje' | 'proximo' | 'realizado' | null

/** Data (YYYY-MM-DD) no fuso do minicurso. */
export function isoDateIn(now: Date = new Date()): string {
  return partsFor(now).date
}

/** Dias de calendário entre duas datas ISO (b - a). */
export function daysBetween(a: string, b: string): number {
  return Math.round((dateFromIso(b).getTime() - dateFromIso(a).getTime()) / 86_400_000)
}

/**
 * Converte "YYYY-MM-DD" em um instante às 12h no fuso do minicurso. Usado pela
 * simulação de data (?simular=YYYY-MM-DD); retorna undefined se for inválida.
 */
export function middayOf(iso: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return undefined
  const date = new Date(`${iso}T12:00:00-03:00`)
  return Number.isNaN(date.getTime()) || isoDateIn(date) !== iso ? undefined : date
}

export function temporalStatusFor(
  encounters: RenderedEncontro[],
  encounter: RenderedEncontro,
  at: Date = new Date(),
): TemporalStatus {
  if (encounter.tipo !== 'encontro' || !encounter.data) return null

  const now = partsFor(at)
  const occurred = (item: RenderedEncontro) => {
    if (!item.data) return false
    const end = item.horario?.fim ?? item.horario?.inicio ?? '23:59'
    return item.data < now.date || (item.data === now.date && end <= now.time)
  }

  if (occurred(encounter)) return 'realizado'
  if (encounter.data === now.date) return 'hoje'

  const upcoming = encounters
    .filter((item) => item.tipo === 'encontro' && item.data && !occurred(item))
    .sort((a, b) => {
      const keyA = `${a.data} ${a.horario?.inicio ?? '00:00'}`
      const keyB = `${b.data} ${b.horario?.inicio ?? '00:00'}`
      return keyA.localeCompare(keyB)
    })

  return upcoming[0]?.id === encounter.id ? 'proximo' : null
}
