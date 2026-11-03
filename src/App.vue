<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'

const main = ref<HTMLElement>()

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

  <main id="conteudo" ref="main" class="app-main" tabindex="-1">
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
