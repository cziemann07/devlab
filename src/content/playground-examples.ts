import formulario from '../../content/cursos/vue-github/codigo/playground/Formulario.vue?raw'
import pizza from '../../content/cursos/vue-github/codigo/playground/Pizza.vue?raw'
import todo from '../../content/cursos/vue-github/codigo/playground/TodoList.vue?raw'
import saudacao from '../../content/cursos/vue-github/codigo/playground/Saudacao.vue?raw'
/** Exemplos e estilos-base do playground de Vue. */

export interface PlaygroundExample {
  id: string
  label: string
  code: string
}

export const playgroundExamples: PlaygroundExample[] = [
  { id: 'formulario', label: 'Formulário com v-model', code: formulario },
  { id: 'saudacao', label: 'Aula 1 · Meu primeiro componente', code: saudacao },
  { id: 'todo-crud', label: 'Aula 2 · Cadastro, edição e exclusão', code: todo },
  {
    id: 'contador',
    label: 'Contador reativo',
    code: `<script setup lang="ts">
import { computed, ref } from 'vue'

const total = ref(0)
const dobrado = computed(() => total.value * 2)
</script>

<template>
  <section class="contador">
    <p class="total">Total: {{ total }}</p>
    <p class="dica">O dobro é {{ dobrado }}</p>

    <div class="acoes">
      <button type="button" @click="total = Math.max(0, total - 1)">−</button>
      <button class="primario" type="button" @click="total++">+</button>
    </div>

    <button class="zerar" type="button" @click="total = 0">Reiniciar</button>
  </section>
</template>

<style scoped>
.contador {
  display: grid;
  gap: 0.85rem;
  justify-items: center;
  padding: 2rem;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
}

.total {
  margin: 0;
  color: var(--primary);
  font-size: 2.6rem;
  font-weight: 750;
  line-height: 1;
}

.dica {
  margin: 0;
  color: var(--text-2);
}

.acoes {
  display: flex;
  gap: 0.6rem;
}

button {
  padding: 0.6rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
  cursor: pointer;
}

button:hover {
  border-color: var(--primary);
}

.primario {
  border-color: var(--primary);
  background: var(--primary);
  color: var(--primary-ink);
  font-weight: 700;
}

.zerar {
  background: transparent;
  color: var(--text-2);
}
</style>`,
  },
  {
    id: 'tarefas',
    label: 'Lista de tarefas',
    code: `<script setup lang="ts">
import { computed, ref } from 'vue'

interface Tarefa {
  id: number
  texto: string
  feita: boolean
}

const nova = ref('')
const proximoId = ref(3)
const tarefas = ref<Tarefa[]>([
  { id: 1, texto: 'Estudar reatividade', feita: true },
  { id: 2, texto: 'Montar o Pizza Vue', feita: false },
])

const pendentes = computed(() => tarefas.value.filter((tarefa) => !tarefa.feita).length)

function adicionar() {
  const texto = nova.value.trim()
  if (!texto) return

  tarefas.value.push({ id: proximoId.value++, texto, feita: false })
  nova.value = ''
}
</script>

<template>
  <section class="lista">
    <h2>Minhas tarefas</h2>

    <form @submit.prevent="adicionar">
      <input v-model="nova" placeholder="Nova tarefa" aria-label="Nova tarefa" />
      <button type="submit">Adicionar</button>
    </form>

    <p class="resumo">{{ pendentes }} pendente(s)</p>

    <ul>
      <li v-for="tarefa in tarefas" :key="tarefa.id">
        <label :class="{ feita: tarefa.feita }">
          <input v-model="tarefa.feita" type="checkbox" />
          <span>{{ tarefa.texto }}</span>
        </label>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.lista {
  display: grid;
  gap: 1rem;
}

h2 {
  margin: 0;
  color: var(--text);
  font-size: 1.3rem;
}

form {
  display: flex;
  gap: 0.5rem;
}

input[type='text'],
form input {
  flex: 1;
  min-width: 0;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
}

button {
  padding: 0.55rem 0.8rem;
  border: 1px solid var(--primary);
  border-radius: 8px;
  background: var(--primary);
  color: var(--primary-ink);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.resumo {
  margin: 0;
  color: var(--text-2);
  font-size: 0.9rem;
}

ul {
  display: grid;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
}

label.feita span {
  color: var(--text-2);
  text-decoration: line-through;
}

input[type='checkbox'] {
  accent-color: var(--primary);
}
</style>`,
  },
  {
    id: 'pizza',
    label: 'Aula 1 · Pizza Vue',
    code: pizza,
  },
]

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
