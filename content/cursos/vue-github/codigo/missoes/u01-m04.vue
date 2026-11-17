<script setup>
import { ref } from 'vue'
const nome = ref('')
</script>

<template>
  <main>
    <label for="nome">Seu nome</label>
    <!-- DESAFIO: conecte o input à variável nome. -->
    <input id="nome" placeholder="Digite seu nome" />
    <p>Olá, {{ nome || 'visitante' }}!</p>
  </main>
</template>
