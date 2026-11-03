<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="not-found">
    <div class="container">
      <p class="eyebrow">// erro 404</p>
      <h1>Página não encontrada</h1>
      <p class="lead">
        O endereço que você tentou abrir não existe ou o conteúdo ainda não foi publicado.
      </p>
      <RouterLink class="btn btn-primary" to="/">Voltar para a página inicial</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  display: grid;
  min-height: 55vh;
  place-items: center;
  padding-block: 4rem;
}

.not-found .container {
  max-width: 42rem;
}

.btn {
  margin-top: 2rem;
}
</style>
