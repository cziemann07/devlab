<script setup>
import { ref } from 'vue'
const escolhido = ref(false)
</script>

<template>
  <main>
    <!-- DESAFIO: faça a classe ativo depender de escolhido. -->
    <button @click="escolhido = !escolhido">Mussarela</button>
    <p>{{ escolhido ? 'Selecionado' : 'Não selecionado' }}</p>
  </main>
</template>

<style scoped>
.ativo { background: #1c9c6a; color: white; }
button { padding: 12px; border-radius: 8px; }
</style>
