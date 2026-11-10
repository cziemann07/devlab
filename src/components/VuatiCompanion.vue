<script setup lang="ts">
import pointing from '../assets/vuati-companions/pointing.png'
import thinking from '../assets/vuati-companions/thinking.png'
import notebook from '../assets/vuati-companions/notebook.png'

// Poses estáticas contextuais, com canvas quadrado próprio. As poses animadas
// do hero continuam usando o registro e o canvas de VuatiMascot.
withDefaults(defineProps<{
  pose: 'pointing' | 'thinking' | 'notebook'
  size?: 'sm' | 'md'
}>(), { size: 'md' })

const sources = { pointing, thinking, notebook }
</script>

<template>
  <span class="vuati-companion" :class="`vuati-companion--${size}`" aria-hidden="true">
    <img :src="sources[pose]" alt="" width="896" height="896" loading="lazy" decoding="async" draggable="false" />
  </span>
</template>

<style scoped>
.vuati-companion {
  display: inline-block;
  flex: none;
  height: var(--vuati-h, 180px);
  aspect-ratio: 1;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
}
.vuati-companion--sm { --vuati-h: 76px; }
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* Aproxima o desenho dentro da margem transparente dos originais. */
  transform: scale(1.2);
  transform-origin: bottom center;
}
</style>
