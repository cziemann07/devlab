<script setup lang="ts">
import { ref } from 'vue'

const total = ref(0)
</script>

<template>
  <section class="contador">
    <p>Total: {{ total }}</p>

    <!-- TODO: botões para incrementar, decrementar e reiniciar -->
  </section>
</template>

<style scoped>
.contador {
  display: grid;
  gap: 1rem;
  justify-items: center;
  padding: 2rem;
}

p {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
