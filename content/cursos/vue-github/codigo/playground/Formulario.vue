<script setup>
import { ref } from 'vue'

const nome = ref('')
const email = ref('')
const mensagem = ref('')

function enviar() {
  if (!nome.value.trim() || !email.value.trim()) {
    mensagem.value = 'Preencha todos os campos!'
    return
  }

  mensagem.value = 'Cadastro realizado com sucesso!'
}
</script>

<template>
  <div class="formulario">
    <h1>Cadastro</h1>

    <form @submit.prevent="enviar">
      <label for="nome">Nome</label>

      <input
        id="nome" v-model="nome"
        placeholder="Digite seu nome"
      />

      <label for="email">Email</label>

      <input
        id="email" v-model="email"
        type="email"
        placeholder="Digite seu email"
      />

      <button type="submit">
        Cadastrar
      </button>
    </form>

    <p v-if="mensagem" role="status">
      {{ mensagem }}
    </p>

    <div v-if="nome">
      <h3>Prévia</h3>
      <p>Nome: {{ nome }}</p>
      <p>Email: {{ email }}</p>
    </div>
  </div>
</template>

<style scoped>
.formulario {
  max-width: 400px;
  margin: auto;
  padding: 24px;
}

h1 {
  color: #e8dfcf;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 12px;
  border: 1px solid #555;
  border-radius: 8px;
  background: #252525;
  color: white;
}

button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #e8dfcf;
  color: #171717;
  cursor: pointer;
}
</style>
