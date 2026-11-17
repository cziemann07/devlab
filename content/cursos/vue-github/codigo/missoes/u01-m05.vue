<script setup>
import { ref } from 'vue'
const quantidade = ref(1)
function aumentar() {
  quantidade.value++
}
function diminuir() {
  quantidade.value--
}
</script>

<template>
  <main>
    <h1>Quantas pizzas?</h1>
    <button @click="diminuir">-</button>
    <strong>{{ quantidade }}</strong>
    <button @click="aumentar">+</button>
    <p>DESAFIO: não permitir menos de 1 nem mais de 10.</p>
  </main>
</template>
