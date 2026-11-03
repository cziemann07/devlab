<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { copyText, selectText } from '../utils/clipboard'

const props = defineProps<{ html?: string }>()
const root = ref<HTMLElement>()

function enhanceCodeBlocks(): void {
  const container = root.value
  if (!container) return

  container.querySelectorAll('pre').forEach((pre) => {
    if (pre.dataset.enhanced === 'true') return
    pre.dataset.enhanced = 'true'

    const wrapper = document.createElement('div')
    wrapper.className = 'prose-code'

    const head = document.createElement('div')
    head.className = 'prose-code-head'
    const label = document.createElement('span')
    label.textContent = 'código'
    head.appendChild(label)

    const status = document.createElement('span')
    status.className = 'sr-only'
    status.setAttribute('aria-live', 'polite')

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'btn btn-sm copy-btn'
    button.textContent = 'Copiar'

    button.addEventListener('click', async () => {
      const code = pre.querySelector('code')
      const text = code?.textContent ?? ''
      const copied = await copyText(text)
      if (copied) {
        button.textContent = 'Copiado'
        button.dataset.copied = 'true'
        status.textContent = 'Código copiado para a área de transferência.'
      } else {
        button.textContent = 'Selecione e copie'
        button.dataset.copied = 'false'
        status.textContent = 'Não foi possível copiar. O código foi selecionado.'
        if (code instanceof HTMLElement) selectText(code)
      }
      setTimeout(() => {
        button.textContent = 'Copiar'
        button.dataset.copied = 'false'
        status.textContent = ''
      }, 1800)
    })

    head.appendChild(button)
    head.appendChild(status)

    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(head)
    wrapper.appendChild(pre)
  })
}

async function refresh(): Promise<void> {
  await nextTick()
  enhanceCodeBlocks()
}

onMounted(refresh)
watch(
  () => props.html,
  () => {
    void refresh()
  },
  { flush: 'post' },
)
</script>

<template>
  <div v-if="html" ref="root" class="prose" v-html="html" />
</template>
