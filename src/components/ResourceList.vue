<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ResourceItem } from '../types/ui'
import Badge from './Badge.vue'
import DemoBadge from './DemoBadge.vue'

defineProps<{ items: ResourceItem[] }>()

function rowProps(item: ResourceItem): Record<string, unknown> {
  return item.to ? { to: item.to } : {}
}

function hrefAttributes(item: ResourceItem): Record<string, string> {
  return item.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
}
</script>

<template>
  <ul class="resource-list">
    <li v-for="item in items" :key="item.key">
      <component
        :is="item.to ? RouterLink : 'div'"
        v-bind="rowProps(item)"
        class="resource"
        :class="{ 'resource--link': Boolean(item.to), 'is-unavailable': !item.available }"
      >
        <span class="resource-icon" aria-hidden="true">{{ item.icon }}</span>

        <div class="resource-body">
          <div class="resource-title">{{ item.titulo }}</div>
          <div v-if="item.descricao" class="resource-desc">{{ item.descricao }}</div>
          <div v-if="item.meta" class="resource-meta">{{ item.meta }}</div>
        </div>

        <div class="resource-actions">
          <Badge v-if="item.badge" :variant="item.badgeVariant ?? 'default'">
            {{ item.badge }}
          </Badge>
          <DemoBadge :show="item.demonstrativo" />
          <Badge v-if="!item.available" variant="warn">em breve</Badge>

          <template v-if="item.available">
            <a
              v-if="item.href"
              v-bind="hrefAttributes(item)"
              class="btn btn-sm"
              :href="item.href"
            >
              {{ item.external ? 'Abrir ↗' : 'Ver' }}
            </a>
            <a
              v-if="item.downloadHref"
              class="btn btn-sm"
              :href="item.downloadHref"
              download
            >
              Baixar
            </a>
            <span v-if="item.to" class="resource-go" aria-hidden="true">→</span>
          </template>
        </div>
      </component>
    </li>
  </ul>
</template>

<style scoped>
.resource-list {
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  list-style: none;
}

.resource-list li + li {
  border-top: 1px solid var(--border);
}

.resource {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.15rem;
  background: var(--surface);
  color: inherit;
  text-decoration: none;
}

.resource--link {
  transition: background 0.15s var(--ease);
}

.resource--link:hover {
  background: var(--surface-2);
}

.resource-icon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
}

.resource-title {
  font-weight: 600;
}

.resource-desc {
  margin-top: 0.1rem;
  color: var(--text-2);
  font-size: 0.88rem;
}

.resource-meta {
  margin-top: 0.15rem;
  color: var(--text-2);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.resource-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
}

.resource-go {
  padding: 0.35rem 0.2rem;
  color: var(--primary);
  font-family: var(--font-mono);
}

.is-unavailable .resource-title {
  color: var(--text-2);
}

@media (max-width: 620px) {
  .resource {
    grid-template-columns: 42px minmax(0, 1fr);
  }

  .resource-actions {
    grid-column: 2;
    justify-content: flex-start;
  }
}
</style>

