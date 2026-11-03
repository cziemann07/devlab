<script setup lang="ts">
withDefaults(defineProps<{ titulo?: string; texto?: string }>(), {
  titulo: 'Conteúdo demonstrativo, não é o material oficial do minicurso',
  texto: undefined,
})
</script>

<template>
  <div class="demo-notice" role="note">
    <strong>{{ titulo }}</strong>
    <p v-if="texto">{{ texto }}</p>
  </div>
</template>

<style scoped>
.demo-notice {
  margin-bottom: 1.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(227, 179, 65, 0.35);
  border-radius: var(--radius);
  background: var(--warn-soft);
  color: var(--warn);
  font-size: 0.88rem;
}

.demo-notice p {
  max-width: 72ch;
  margin: 0.3rem 0 0;
  color: var(--text-2);
}
</style>
