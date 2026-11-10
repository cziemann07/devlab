# Vue.js: Options API vs Composition API

O mesmo componente (um contador simples) escrito nos dois estilos.

## Options API

```vue
<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    double() {
      return this.count * 2;
    },
  },
  methods: {
    increment() {
      this.count++;
    },
  },
  mounted() {
    console.log("Componente montado");
  },
};
</script>

<template>
  <button @click="increment">
    Cliques: {{ count }} (dobro: {{ double }})
  </button>
</template>
```

## Composition API (`<script setup>`)

```vue
<script setup>
import { ref, computed, onMounted } from "vue";

const count = ref(0);
const double = computed(() => count.value * 2);

function increment() {
  count.value++;
}

onMounted(() => {
  console.log("Componente montado");
});
</script>

<template>
  <button @click="increment">
    Cliques: {{ count }} (dobro: {{ double }})
  </button>
</template>
```

## Principais diferenças

- **Organização:** Options API separa o código por tipo (`data`, `computed`, `methods`); Composition API agrupa por funcionalidade.
- **Reatividade:** Options API usa `this`; Composition API usa `ref`/`reactive` e `.value` no script.
- **Reuso de lógica:** Composition API permite composables (`useCounter()`), mais limpo que mixins.
- **TypeScript:** inferência de tipos mais natural na Composition API.
