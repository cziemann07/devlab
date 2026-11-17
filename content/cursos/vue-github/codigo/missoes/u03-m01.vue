<script setup>
// T01: vamos transformar esta interface estática em uma lista viva.
</script>

<template>
  <main class="app">
    <h1>✅ Minha To-Do List</h1>
    <section class="painel">
      <h2>Nova tarefa</h2>
      <form @submit.prevent>
        <label for="titulo">Título</label>
        <input id="titulo" class="campo" placeholder="Ex.: estudar Vue" />
        <label for="descricao">Descrição</label>
        <textarea id="descricao" class="campo" rows="3" placeholder="O que fazer?"></textarea>
        <button type="submit">Adicionar tarefa</button>
      </form>
    </section>
    <section class="painel">
      <h2>Minhas tarefas</h2>
      <p class="lista-vazia">Nenhuma tarefa cadastrada.</p>
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
