<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'default' | 'primary' | 'warn' | 'info'
    dot?: boolean
  }>(),
  { variant: 'default', dot: false },
)
</script>

<template>
  <span class="badge" :class="`badge--${variant}`">
    <span v-if="dot" class="dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  line-height: 1.25;
  white-space: nowrap;
}

.badge--primary {
  border-color: rgba(66, 184, 131, 0.35);
  background: var(--primary-soft);
  color: var(--primary);
}

.badge--warn {
  border-color: rgba(227, 179, 65, 0.35);
  background: var(--warn-soft);
  color: var(--warn);
}

.badge--info {
  border-color: rgba(121, 192, 255, 0.35);
  background: var(--info-soft);
  color: var(--info);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
</style>
