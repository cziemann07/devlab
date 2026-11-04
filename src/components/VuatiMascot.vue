<script setup lang="ts">
import { computed } from 'vue'
import { VUATI_CANVAS, vuatiSource, type VuatiPose } from '../assets/vuati'

/**
 * Vuati, mascote do DevLab. Usa apenas as poses aprovadas (regras em src/assets/vuati/README.md).
 *
 * - `pose`: pose exibida.
 * - `poses`: poses mantidas carregadas para troca instantânea (ex.: no hero).
 * - `size`: sm (dicas, cantos), md (blocos), lg (hero).
 * - `alt`: texto alternativo quando a imagem é informativa; sem ele, o mascote
 *   é decorativo e fica oculto para leitores de tela.
 */
const props = withDefaults(
  defineProps<{
    pose?: VuatiPose
    poses?: VuatiPose[]
    size?: 'sm' | 'md' | 'lg'
    alt?: string
  }>(),
  { pose: 'front', poses: undefined, size: 'md', alt: undefined },
)

const stack = computed<VuatiPose[]>(() => {
  const list = props.poses ?? [props.pose]
  return list.includes(props.pose) ? list : [props.pose, ...list]
})
const variant = computed(() => (props.size === 'sm' ? 'sm' : 'md'))
</script>

<template>
  <span
    class="vuati"
    :class="`vuati--${size}`"
    :role="alt ? 'img' : undefined"
    :aria-label="alt"
    :aria-hidden="alt ? undefined : 'true'"
  >
    <img
      v-for="item in stack"
      :key="item"
      :src="vuatiSource(item, variant)"
      alt=""
      :width="VUATI_CANVAS.width"
      :height="VUATI_CANVAS.height"
      :class="{ 'is-active': item === pose }"
      :loading="item === pose ? 'eager' : 'lazy'"
      decoding="async"
      draggable="false"
    />
  </span>
</template>

<style scoped>
.vuati {
  position: relative;
  display: inline-block;
  flex: none;
  height: var(--vuati-h, 180px);
  aspect-ratio: 703 / 633;
  pointer-events: none;
  user-select: none;
}

.vuati--sm {
  --vuati-h: 76px;
}

.vuati--lg {
  --vuati-h: clamp(220px, 30vw, 380px);
}

img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
}

/* Troca de pose instantânea, como num sprite: sem interpolação entre quadros. */
img.is-active {
  opacity: 1;
}
</style>
