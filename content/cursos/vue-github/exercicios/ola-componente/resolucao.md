A solução mantém o nome em um `ref` e cria uma `computed` para a saudação. Assim, o template só exibe o resultado e a regra de valor padrão fica em um único lugar.

```ts
const nome = ref('DevLab')
const saudacao = computed(() => `Olá, ${nome.value || 'pessoa'}!`)
```

O `v-model` liga o input diretamente ao `ref`. Quando o valor muda, a `computed` é recalculada automaticamente e o texto é atualizado sem manipular o DOM manualmente.
