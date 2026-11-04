<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import { getCourse } from './content'

const main = ref<HTMLElement>()
const route = useRoute()

// A identidade temática do curso vale dentro de <main>; cabeçalho e rodapé
// mantêm a identidade neutra do DevLab.
const courseTheme = computed<Record<string, string>>(() => {
  if (route.name === 'not-found') return {}
  const slug = typeof route.params.slug === 'string' ? route.params.slug : undefined
  const tema = getCourse(slug)?.curso.tema
  if (!tema) return {}
  return {
    '--primary': tema.destaque,
    '--primary-ink': tema.tinta ?? '#0b0f14',
  }
})

function skipToContent(): void {
  main.value?.focus({ preventScroll: true })
  window.scrollTo({ top: 0, behavior: 'auto' })
}
</script>

<template>
  <button class="skip-link" type="button" @click="skipToContent">
    Pular para o conteúdo
  </button>

  <SiteHeader />

  <main id="conteudo" ref="main" class="app-main course-theme" tabindex="-1" :style="courseTheme">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
    </RouterView>
  </main>

  <SiteFooter />
</template>

<style scoped>
.app-main {
  min-height: 62vh;
}

.app-main:focus {
  outline: none;
}
</style>
