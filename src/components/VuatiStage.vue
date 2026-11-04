<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { VuatiPose } from '../assets/vuati'
import VuatiMascot from './VuatiMascot.vue'

/**
 * Vuati no hero. Comportamento:
 * - repouso: flutuação suave (só CSS, poucos pixels);
 * - de tempos em tempos olha de perfil e volta (alternância entre poses);
 * - ao passar o mouse sobre ele: vira de perfil, curioso;
 * - `atento` (hover/foco em um controle do hero): pequeno salto, de frente;
 * - clique: comemora com a bandeira por alguns segundos;
 * - `pose` de repouso pode ser a bandeira em momentos especiais (dia de
 *   encontro, encerramento).
 * Com prefers-reduced-motion: sem flutuação, saltos ou trocas automáticas.
 * É decorativo: a fala é texto comum e nenhuma informação depende do mascote.
 */
const props = withDefaults(
  defineProps<{ pose?: VuatiPose; atento?: boolean; fala?: string }>(),
  { pose: 'front', atento: false, fala: undefined },
)

const GLANCE_EVERY_MS = 9000
const GLANCE_FOR_MS = 1600
const CELEBRATE_FOR_MS = 2600

const hovering = ref(false)
const glancing = ref(false)
const celebrating = ref(false)
const reducedMotion = ref(false)

let glanceTimer: ReturnType<typeof setInterval> | undefined
let glanceEnd: ReturnType<typeof setTimeout> | undefined
let celebrateEnd: ReturnType<typeof setTimeout> | undefined
let motionQuery: MediaQueryList | undefined

const currentPose = computed<VuatiPose>(() => {
  if (celebrating.value) return 'brazil'
  if (props.atento) return 'front'
  if (hovering.value || glancing.value) return 'side'
  return props.pose
})

function glance(): void {
  if (reducedMotion.value || document.hidden || hovering.value || props.atento || celebrating.value) {
    return
  }
  glancing.value = true
  glanceEnd = setTimeout(() => {
    glancing.value = false
  }, GLANCE_FOR_MS)
}

function celebrate(): void {
  celebrating.value = true
  if (celebrateEnd) clearTimeout(celebrateEnd)
  celebrateEnd = setTimeout(() => {
    celebrating.value = false
  }, CELEBRATE_FOR_MS)
}

function syncMotion(): void {
  reducedMotion.value = Boolean(motionQuery?.matches)
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncMotion()
  motionQuery.addEventListener('change', syncMotion)
  glanceTimer = setInterval(glance, GLANCE_EVERY_MS)
})

onBeforeUnmount(() => {
  motionQuery?.removeEventListener('change', syncMotion)
  if (glanceTimer) clearInterval(glanceTimer)
  if (glanceEnd) clearTimeout(glanceEnd)
  if (celebrateEnd) clearTimeout(celebrateEnd)
})

watch(
  () => props.atento,
  (value) => {
    if (value) glancing.value = false
  },
)
</script>

<template>
  <div
    class="vuati-stage"
    :class="{
      'is-atento': atento,
      'is-curioso': hovering && !atento,
      'is-comemorando': celebrating,
    }"
  >
    <p v-if="fala" class="vuati-fala">
      <span class="sr-only">Vuati, o mascote, diz: </span>{{ fala }}
    </p>
    <div
      class="vuati-actor"
      @pointerenter="hovering = true"
      @pointerleave="hovering = false"
      @click="celebrate"
    >
      <div class="vuati-float">
        <VuatiMascot :pose="currentPose" :poses="['front', 'side', 'brazil']" size="lg" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vuati-stage {
  position: relative;
  display: grid;
  justify-items: center;
}

.vuati-actor {
  /* A área de interação acompanha o corpo, não o canvas inteiro. */
  transition: transform 0.35s var(--ease);
}

.vuati-actor :deep(.vuati) {
  pointer-events: auto;
}

.vuati-float {
  animation: vuati-float 5.2s ease-in-out infinite;
}

.is-atento .vuati-actor {
  transform: translateY(-8px);
}

.is-curioso .vuati-actor {
  transform: translateX(6px) rotate(1.5deg);
}

.is-comemorando .vuati-actor {
  animation: vuati-hop 0.5s var(--ease) 2;
}

@keyframes vuati-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

@keyframes vuati-hop {
  0%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-12px);
  }
}

.vuati-fala {
  position: relative;
  z-index: 1;
  max-width: 30ch;
  margin: 0 0 -0.25rem;
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text);
  font-size: 0.88rem;
  line-height: 1.45;
  justify-self: start;
  margin-left: 8%;
}

/* Rabicho da fala apontando para o capacete. */
.vuati-fala::after {
  position: absolute;
  bottom: -6px;
  left: 2.4rem;
  width: 10px;
  height: 10px;
  border-right: 1px solid var(--border-strong);
  border-bottom: 1px solid var(--border-strong);
  background: var(--surface);
  content: "";
  transform: rotate(45deg);
}

@media (prefers-reduced-motion: reduce) {
  .vuati-float,
  .is-comemorando .vuati-actor {
    animation: none;
  }

  .vuati-actor {
    transition: none;
  }

  .is-atento .vuati-actor,
  .is-curioso .vuati-actor {
    transform: none;
  }
}
</style>
