**Conceitos:** condicionais, eventos e mensagem de status · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** Como informar que o pedido foi finalizado sem simular uma compra real?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

Uma ação precisa oferecer feedback compreensível. Um `computed()` como `pedidoValido` pode controlar o botão, enquanto um `ref()` guarda a mensagem mostrada após finalizar. **A simulação não envia pedidos, não cobra valores e não grava dados em servidor.** Ao alterar os dados, é importante discutir se uma confirmação antiga ainda representa o estado atual.

### 3. Sua tarefa no playground

Crie o botão “Finalizar simulação” e só permita a ação quando existir nome e ao menos um sabor. Mostre uma mensagem clara de confirmação local.

**Experimente:** Teste finalizar sem nome, com nome sem sabor, e com ambos preenchidos. Nenhuma operação de pagamento é realizada.

**Critério de conclusão:** O botão bloqueia o envio inválido e a confirmação só aparece após uma ação válida.

### 4. Conversa, revisão e autonomia

- **Explique:** O que significa dar feedback ao usuário? A mensagem deve mudar se o pedido foi alterado após a confirmação?
- **Desafio extra:** Faça a confirmação desaparecer quando qualquer campo do pedido for editado (desafio com watch).
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
