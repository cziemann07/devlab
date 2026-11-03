<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'

defineProps<{
  items: { label: string; to?: RouteLocationRaw }[]
}>()
</script>

<template>
  <nav class="breadcrumb" aria-label="Você está em">
    <ol>
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`">
        <RouterLink v-if="item.to" :to="item.to">{{ item.label }}</RouterLink>
        <span v-else :aria-current="index === items.length - 1 ? 'page' : undefined">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb {
  margin-bottom: 1.6rem;
  color: var(--text-2);
  font-size: 0.84rem;
}

ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

li + li::before {
  margin-right: 0.4rem;
  color: var(--border);
  content: "/";
}

a {
  text-decoration: none;
}

a:hover {
  color: var(--text);
  text-decoration: underline;
}
</style>
