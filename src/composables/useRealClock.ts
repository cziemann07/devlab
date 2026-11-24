import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useRealClock() {
  const now = ref(new Date())
  const update = () => { now.value = new Date() }
  let timer: ReturnType<typeof setInterval>
  onMounted(() => {
    update()
    timer = setInterval(update, 30_000)
    window.addEventListener('focus', update)
  })
  onBeforeUnmount(() => {
    clearInterval(timer)
    window.removeEventListener('focus', update)
  })
  return now
}
