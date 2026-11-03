<script setup lang="ts">
import Badge from './Badge.vue'

defineProps<{ show?: boolean }>()
</script>

<template>
  <Badge v-if="show" variant="warn">Demonstrativo</Badge>
</template>
