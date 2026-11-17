import { ref } from 'vue'

const key = 'devlab-progress-v1'
const completed = ref<string[]>([])
const storageAvailable = ref(true)
let loaded = false

export function useProgress() {
  if (!loaded) {
    loaded = true
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(key) ?? '[]')
      completed.value = Array.isArray(saved)
        ? saved.filter((item): item is string => typeof item === 'string')
        : []
    } catch {
      storageAvailable.value = false
    }
  }
  function isComplete(course: string, id: string): boolean {
    return completed.value.includes(`${course}:${id}`)
  }
  function toggle(course: string, id: string): void {
    const value = `${course}:${id}`
    completed.value = isComplete(course, id)
      ? completed.value.filter((item) => item !== value)
      : [...completed.value, value]
    try {
      localStorage.setItem(key, JSON.stringify(completed.value))
      storageAvailable.value = true
    } catch {
      storageAvailable.value = false
    }
  }
  return { isComplete, toggle, storageAvailable }
}
