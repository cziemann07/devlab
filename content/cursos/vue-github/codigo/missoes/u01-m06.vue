<script setup>
import { ref } from 'vue'
const preco = ref(35)
const quantidade = ref(1)
// DESAFIO: crie um valor calculado chamado total.
</script>

<template>
  <main>
    <h1>Quanto custa?</h1>
    <button @click="quantidade = Math.max(1, quantidade - 1)">-</button>
    <span>{{ quantidade }} pizza(s)</span>
    <button @click="quantidade = Math.min(10, quantidade + 1)">+</button>
    <p>Preço unitário: R$ {{ preco.toFixed(2) }}</p>
    <!-- DESAFIO: mostre o total calculado aqui. -->
  </main>
</template>
