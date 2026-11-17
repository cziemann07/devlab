<script setup>
import { ref } from 'vue'

const vazio = () => ({ id: null, title: '', description: '', created_at: null })
const todo = ref(vazio())
const todos = ref([])
const errors = ref({})
const mensagem = ref('')
const excluirId = ref(null)
let proximoId = 1

function limpar() {
  todo.value = vazio()
  errors.value = {}
}

function salvar() {
  errors.value = {}
  const title = todo.value.title.trim()
  const description = todo.value.description.trim()
  if (!title) errors.value.title = 'Informe o título.'
  if (!description) errors.value.description = 'Informe a descrição.'
  if (Object.keys(errors.value).length) return

  if (todo.value.id !== null) {
    const index = todos.value.findIndex(item => item.id === todo.value.id)
    if (index < 0) { mensagem.value = 'Tarefa não encontrada.'; limpar(); return }
    todos.value[index] = { ...todo.value, title, description }
    mensagem.value = 'Tarefa alterada.'
  } else {
    todos.value.push({ id: proximoId++, title, description, created_at: new Date() })
    mensagem.value = 'Tarefa cadastrada.'
  }
  limpar()
}

function editar(item) {
  // A cópia mantém o card intacto até salvar.
  todo.value = { ...item }
  errors.value = {}
}

function excluir() {
  const index = todos.value.findIndex(item => item.id === excluirId.value)
  if (index < 0) { excluirId.value = null; return }
  todos.value.splice(index, 1)
  if (todo.value.id === excluirId.value) limpar()
  excluirId.value = null
  mensagem.value = 'Tarefa excluída.'
}
</script>

<template>
  <main>
    <h1>Cadastro de tarefas</h1>
    <p>Adaptação em arquivo único. No projeto local, extraia Input e Button.</p>
    <form @submit.prevent="salvar">
      <label for="titulo">Título da tarefa</label>
      <input id="titulo" v-model="todo.title" @input="errors.title = ''" />
      <p v-if="errors.title" role="alert">{{ errors.title }}</p>
      <label for="descricao">Descrição</label>
      <input id="descricao" v-model="todo.description" @input="errors.description = ''" />
      <p v-if="errors.description" role="alert">{{ errors.description }}</p>
      <button type="submit">{{ todo.id === null ? 'Salvar' : 'Salvar alteração' }}</button>
      <button v-if="todo.id !== null" type="button" @click="limpar">Cancelar edição</button>
    </form>
    <p role="status">{{ mensagem }}</p>
    <h2>Tarefas cadastradas: {{ todos.length }}</h2>
    <p v-if="!todos.length">Nenhuma tarefa cadastrada.</p>
    <article v-for="item in todos" :key="item.id">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
      <p>{{ item.created_at.toLocaleString('pt-BR') }}</p>
      <button @click="editar(item)">Editar</button>
      <button @click="excluirId = item.id">Excluir</button>
      <div v-if="excluirId === item.id">
        <p>Excluir esta tarefa?</p>
        <button @click="excluir">Confirmar exclusão</button>
        <button @click="excluirId = null">Cancelar</button>
      </div>
    </article>
  </main>
</template>

<style scoped>
main { max-width: 38rem; margin: auto; }
form { display: grid; gap: .6rem; }
input, button { padding: .65rem; border: 1px solid var(--border); border-radius: .5rem; background: var(--surface); color: var(--text); font: inherit; }
button { cursor: pointer; margin: .2rem; }
button:hover { border-color: var(--primary); }
article { padding: 1rem; border: 1px solid var(--border); border-radius: .6rem; margin-block: 1rem; }
[role="alert"] { color: #ffadad; }
[role="status"] { color: var(--primary); }
</style>
