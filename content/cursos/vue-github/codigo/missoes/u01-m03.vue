<script setup>
const sabor = 'Mussarela'
const preco = 35
const quantidade = 2
</script>

<template>
  <main>
    <h1>Resumo inicial</h1>
    <p>Sabor: {{ sabor }}</p>
    <p>Quantidade: {{ quantidade }}</p>
    <!-- DESAFIO: exiba o preço unitário e o valor total usando
         uma expressão JavaScript dentro de {{ }}. -->
  </main>
</template>
