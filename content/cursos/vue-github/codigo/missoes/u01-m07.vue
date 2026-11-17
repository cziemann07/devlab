<script setup>
import { ref } from 'vue'
const aberto = ref(false)
</script>

<template>
  <main>
    <h1>Status da pizzaria</h1>
    <button @click="aberto = !aberto">Alternar status</button>
    <!-- DESAFIO: exiba "Aceitando pedidos" se aberto for true;
         caso contrário, exiba "Fechado por enquanto". -->
  </main>
</template>
