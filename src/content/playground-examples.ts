import { getCourse } from './index'

const course = getCourse()!

// O cadastro da missão e seu código inicial são a única fonte do seletor.
export const playgroundExamples = course.exercicios
  .filter(mission => mission.disponivel && mission.playgroundExemplo)
  .map(mission => ({
    id: mission.id,
    label: `${mission.codigo} · ${mission.titulo}`,
    group: `Encontro ${mission.encontroId} · Unidade ${mission.unidadeId} — ${course.unidades.find(unit => unit.id === mission.unidadeId)!.titulo}`,
    code: mission.codigoInicial[0]!.fonte!,
  }))

const legacy: Record<string, string> = {
  pizza: 'u02-m01', 'todo-crud': 'u03-m01', formulario: 'u01-m04',
  saudacao: 'u01-m01', contador: 'u01-m05', 'options-api': 'u01-m01',
}

export function findPlaygroundExample(id: unknown) {
  const target = typeof id === 'string' ? legacy[id] ?? id : ''
  return playgroundExamples.find(example => example.id === target) ?? playgroundExamples[0]!
}

export const playgroundPreviewBaseStyles = `:root {
  --text: #f3f4f6; --text-2: #a7b0bf; --surface: #141c26; --surface-2: #1c2733;
  --border: #344153; --primary: #42b883; --primary-ink: #0b0f14; --primary-line: #42b88366;
  background: #0b0f14;
  display: block;
  min-height: 100%;
  color: var(--text, #f3f4f6);
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: 16px;
  line-height: 1.6;
}
*, *::before, *::after { box-sizing: border-box; }
h1, h2, h3, h4, p { margin-top: 0; }
.playground-mount { min-height: 100%; padding: 1.5rem; }`
