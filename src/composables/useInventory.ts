import { ref } from 'vue'

const isInventoryOpen = ref(false)

export function useInventory() {
  function openInventory(): void {
    isInventoryOpen.value = true
  }

  return { isInventoryOpen, openInventory }
}
