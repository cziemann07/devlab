<script setup>
import { ref } from 'vue'
const nome = ref('')
</script>
<template>
  <label for="nome">Seu nome</label>
  <input id="nome" v-model="nome" />
  <h1>Olá, {{ nome || 'DevLab' }}!</h1>
</template>
<style scoped>
h1 { color: #42b883; }
input { display: block; padding: .5rem; margin-top: .5rem; }
</style>
