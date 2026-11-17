<script setup>
import { ref } from 'vue'
const cliente = ref('')
</script>

<template>
  <main class="pagina">
    <section class="cartao">
      <h1>🍕 Pizza Vue</h1>
      <p>Monte seu pedido e observe o resumo.</p>
      <label for="cliente">Nome do cliente</label>
      <input id="cliente" class="campo" placeholder="Seu nome" v-model="cliente" />
      <label for="tamanho">Tamanho</label>
      <select id="tamanho" class="campo">
        <option>Média</option>
      </select>
      <p class="dica">Os sabores aparecerão na próxima missão.</p>
      <p>Quantidade: 1</p>
    </section>
    <aside class="cartao resumo">
      <h2>Resumo do pedido</h2>
      <p><strong>Cliente:</strong> {{ cliente.trim() || 'Não informado' }}</p>
      <p><strong>Tamanho:</strong> Média</p>
      <p class="dica">Regra desta atividade: sabores não alteram o preço.</p>
    </aside>
  </main>
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; background: #f4f8f5; font-family: Arial, sans-serif; color: #13291c; }
.pagina { display: grid; grid-template-columns: repeat(auto-fit,minmax(270px,1fr)); gap: 1rem; max-width: 920px; margin: 2rem auto; padding: 1rem; }
.cartao { background: white; border: 1px solid #bad5c3; border-radius: 16px; padding: 1.4rem; box-shadow: 0 4px 18px #123b1d12; }
label, legend { font-weight: 600; }
.campo { display: block; width: 100%; padding: .7rem; margin: .4rem 0 1rem; border: 1px solid #829a89; border-radius: 8px; font: inherit; }
fieldset { border: 1px solid #b4cab9; border-radius: 8px; margin-bottom: 1rem; }
.opcao { display: block; padding: .27rem 0; font-weight: normal; }
.botoes { display:flex; align-items:center; gap:.8rem; margin:.6rem 0 1rem; }
button { background: #188958; color:white; border:0; border-radius:8px; padding:.7rem 1rem; cursor:pointer; font:inherit; }
button:disabled { background:#95a49a; cursor:not-allowed; }
.resumo { background:#e7faeb; }
.total { font-size:1.35rem; font-weight:800; color:#10663d; }
.mensagem { background:#ccf3d5; padding:.7rem; border-radius:8px; }
.dica { color:#526657; font-size:.92rem; }
</style>
