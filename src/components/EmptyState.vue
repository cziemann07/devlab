<script setup lang="ts">
withDefaults(
  defineProps<{
    titulo: string
    texto?: string
    icon?: string
  }>(),
  { icon: '…' },
)
</script>

<template>
  <div class="empty-state">
    <span class="empty-icon" aria-hidden="true">{{ icon }}</span>
    <div>
      <strong>{{ titulo }}</strong>
      <p v-if="texto">{{ texto }}</p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.35rem;
  border: 1px dashed var(--border);
  border-radius: var(--radius-lg);
  background: rgba(21, 27, 35, 0.5);
}

.empty-icon {
  display: grid;
  flex: none;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

strong {
  display: block;
  margin-top: 0.15rem;
}

p {
  margin: 0.3rem 0 0;
  color: var(--text-2);
  font-size: 0.92rem;
}

:slotted(a),
:slotted(.btn) {
  margin-top: 0.85rem;
}
</style>
