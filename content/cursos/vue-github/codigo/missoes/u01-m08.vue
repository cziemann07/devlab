<script setup>
import { ref } from 'vue'
const sabores = ref(['Mussarela', 'Calabresa', 'Marguerita'])
</script>

<template>
  <main>
    <h1>Sabores disponíveis</h1>
    <!-- DESAFIO: liste os sabores usando v-for e uma :key. -->
    <p>Quantos sabores existem? {{ sabores.length }}</p>
  </main>
</template>
