<script setup lang="ts">
import { computed, ref } from 'vue'

const sizes = [
  { id: 'p', label: 'Pequena', price: 25 },
  { id: 'm', label: 'Média', price: 35 },
  { id: 'g', label: 'Grande', price: 45 },
]
const name = ref('')
const size = ref('g')
const quantity = ref(1)
const total = computed(() => (sizes.find(item => item.id === size.value)?.price ?? 0) * quantity.value)
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
</script>

<template>
  <section class="pizza-demo" aria-labelledby="pizza-demo-title">
    <h3 id="pizza-demo-title">Experimente o resumo do pedido</h3>
    <p>Digite um nome e altere o tamanho ou a quantidade. A tela acompanha o estado e recalcula o total. Os preços são ilustrativos.</p>
    <div class="controls">
      <label>Nome <input v-model="name" placeholder="Seu nome" /></label>
      <label>Tamanho
        <select v-model="size">
          <option v-for="item in sizes" :key="item.id" :value="item.id">{{ item.label }} · {{ currency.format(item.price) }}</option>
        </select>
      </label>
      <div role="group" aria-label="Quantidade de pizzas" class="quantity">
        <button type="button" class="btn btn-sm" aria-label="Diminuir quantidade" :disabled="quantity <= 1" @click="quantity--">−</button>
        <span>{{ quantity }}</span>
        <button type="button" class="btn btn-sm" aria-label="Aumentar quantidade" :disabled="quantity >= 10" @click="quantity++">+</button>
      </div>
    </div>
    <p class="receipt"><span>Cliente: {{ name.trim() || 'Não informado' }}</span><output aria-label="Total do pedido">{{ currency.format(total) }}</output></p>
  </section>
</template>

<style scoped>
.pizza-demo { display: grid; gap: .9rem; margin-block: 1.5rem; padding: clamp(1rem, 3vw, 1.5rem); background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--primary); border-radius: var(--radius); }
.controls, .quantity, .receipt { display: flex; flex-wrap: wrap; align-items: end; gap: .75rem; }
.controls label { flex: 1 1 10rem; min-width: 0; display: grid; gap: .3rem; }
.controls input, .controls select { width: 100%; padding: .5rem; border: 1px solid var(--border-strong); border-radius: var(--radius-sm); background: var(--bg); color: var(--text); font: inherit; }
.quantity { align-items: center; }
.receipt { justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: .8rem; overflow-wrap: anywhere; }
.receipt output { color: var(--primary); font: 700 1.4rem var(--font-mono); }
</style>
