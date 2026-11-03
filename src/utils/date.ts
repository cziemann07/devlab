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

export type TemporalStatus = 'proximo' | 'realizado' | null

export function temporalStatusFor(
  encounters: RenderedEncontro[],
  encounter: RenderedEncontro,
): TemporalStatus {
  if (encounter.tipo !== 'encontro' || !encounter.data) return null

  const now = partsFor(new Date())
  const occurred = (item: RenderedEncontro) => {
    if (!item.data) return false
    const end = item.horario?.fim ?? item.horario?.inicio ?? '23:59'
    return item.data < now.date || (item.data === now.date && end <= now.time)
  }

  if (occurred(encounter)) return 'realizado'

  const upcoming = encounters
    .filter((item) => item.tipo === 'encontro' && item.data && !occurred(item))
    .sort((a, b) => {
      const keyA = `${a.data} ${a.horario?.inicio ?? '00:00'}`
      const keyB = `${b.data} ${b.horario?.inicio ?? '00:00'}`
      return keyA.localeCompare(keyB)
    })

  return upcoming[0]?.id === encounter.id ? 'proximo' : null
}
