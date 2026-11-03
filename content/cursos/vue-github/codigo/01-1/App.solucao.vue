<script setup lang="ts">
import { computed, ref } from 'vue'

const nome = ref('DevLab')
const saudacao = computed(() => `Olá, ${nome.value || 'pessoa'}!`)
</script>

<template>
  <main class="boas-vindas">
    <h1>{{ saudacao }}</h1>

    <label for="nome">Seu nome</label>
    <input id="nome" v-model="nome" type="text" placeholder="Digite seu nome" />

    <p>Edite o campo e veja a saudação atualizar em tempo real.</p>
  </main>
</template>

<style scoped>
.boas-vindas {
  max-width: 32rem;
  margin: 4rem auto;
  padding: 0 1.5rem;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid #303843;
  border-radius: 8px;
  background: #151b23;
  color: #f3f4f6;
}
</style>
