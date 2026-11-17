<script setup>
import { ref, computed } from 'vue'
const titulo = ref('')
const descricao = ref('')
const erro = ref('')
const tarefas = ref([])
let proximoId = 1
const totalTarefas = computed(() => tarefas.value.length)
const idParaExcluir = ref(null)
const idEmEdicao = ref(null)
function salvar() {
  erro.value = ''
  if (!titulo.value.trim() || !descricao.value.trim()) {
    erro.value = 'Preencha título e descrição.'
    return
  }
  if (idEmEdicao.value !== null) {
    const encontrada = tarefas.value.find(t => t.id === idEmEdicao.value)
    if (encontrada) { encontrada.titulo = titulo.value.trim(); encontrada.descricao = descricao.value.trim() }
    idEmEdicao.value = null
  } else {
  tarefas.value.push({
    id: proximoId++,
    titulo: titulo.value.trim(),
    descricao: descricao.value.trim()
  })
  }
  titulo.value = ''
  descricao.value = ''
}
function pedirExclusao(id) { idParaExcluir.value = id }
function cancelarExclusao() { idParaExcluir.value = null }
function confirmarExclusao() {
  tarefas.value = tarefas.value.filter(tarefa => tarefa.id !== idParaExcluir.value)
  idParaExcluir.value = null
}
function editar(tarefa) {
  idEmEdicao.value = tarefa.id
  titulo.value = tarefa.titulo
  descricao.value = tarefa.descricao
  erro.value = ''
}
function cancelarEdicao() {
  idEmEdicao.value = null
  titulo.value = ''
  descricao.value = ''
  erro.value = ''
}
</script>

<template>
  <main class="app container py-4">
    <h1>✅ Minha To-Do List</h1>
    <section class="painel card shadow-sm p-4">
      <h2>Nova tarefa</h2>
      <form @submit.prevent="salvar">
        <label for="titulo">Título</label>
        <input id="titulo" class="campo form-control" placeholder="Ex.: estudar Vue" v-model="titulo" />
        <label for="descricao">Descrição</label>
        <textarea id="descricao" class="campo form-control" rows="3" placeholder="O que fazer?" v-model="descricao"></textarea>
        <p v-if="erro" class="erro" role="alert">{{ erro }}</p>
        <button type="submit" class="btn btn-primary">{{ idEmEdicao !== null ? 'Salvar edição' : 'Adicionar tarefa' }}</button>
        <button v-if="idEmEdicao !== null" type="button" class="secundario" @click="cancelarEdicao">Cancelar edição</button>
      </form>
    </section>
    <section class="painel card shadow-sm p-4">
      <h2>Minhas tarefas ({{ totalTarefas }})</h2>
      <p v-if="tarefas.length === 0" class="lista-vazia">Nenhuma tarefa cadastrada.</p>
      <article v-for="tarefa in tarefas" :key="tarefa.id" class="tarefa">
        <h3>{{ tarefa.titulo }}</h3>
        <p>{{ tarefa.descricao }}</p>
        <button type="button" @click="editar(tarefa)">Editar</button>
        <button type="button" class="perigo" @click="pedirExclusao(tarefa.id)">Excluir</button>
        <div v-if="idParaExcluir === tarefa.id" class="confirmacao">
          <p>Deseja mesmo excluir esta tarefa?</p>
          <button type="button" class="perigo" @click="confirmarExclusao">Sim, excluir</button>
          <button type="button" class="secundario" @click="cancelarExclusao">Cancelar</button>
        </div>
      </article>
    </section>
  </main>
</template>

<style>
* { box-sizing: border-box; }
body { margin:0; font-family:Arial,sans-serif; background:#f4f7fa; color:#1b2733; }
.app { max-width:920px; margin:2rem auto; padding:1rem; }
.painel { background:#fff; border:1px solid #d8e0e7; border-radius:14px; padding:1.4rem; margin-bottom:1rem; box-shadow:0 3px 14px #17283b12; }
.campo { display:block; width:100%; border:1px solid #9caebc; padding:.7rem; border-radius:7px; margin:.35rem 0 1rem; font:inherit; }
button { background:#1665b3; color:white; border:0; border-radius:7px; padding:.65rem .9rem; cursor:pointer; font:inherit; }
button.secundario { background:#677686; }
button.perigo { background:#aa3040; }
button + button { margin-left:.5rem; }
.erro { color:#a21b36; font-weight:bold; }
.tarefa { border:1px solid #ccd8e0; padding:1rem; margin:.7rem 0; border-radius:9px; background:white; }
.tarefa h3 { margin:.15rem 0; }
.tarefa p { overflow-wrap:anywhere; }
.detalhe { font-size:.86rem; color:#5a6c7c; }
.confirmacao { background:#fff3db; padding:.9rem; border-radius:8px; margin-top:.6rem; }
.lista-vazia { color:#5b6a74; }
</style>
