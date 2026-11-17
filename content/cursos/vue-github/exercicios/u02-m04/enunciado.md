**Conceitos:** arrays, checkbox, v-for e v-if · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** Por que um único texto não representa bem várias escolhas?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

Checkboxes que compartilham `v-model` com um array podem representar várias escolhas. A diretiva `v-for` renderiza uma opção para cada elemento do catálogo; `:key` permite identificar cada item. `v-if` / `v-else` decidem se a lista ou o aviso de vazio será exibido. Nesta pizzaria, **sabores não modificam o preço**.

### 3. Sua tarefa no playground

Crie um array para os sabores selecionados, gere caixas de seleção com v-for e apresente um aviso caso nenhum sabor tenha sido escolhido.

**Experimente:** Escolha dois sabores, desmarque um e depois desmarque todos; o resumo deve acompanhar essas três situações.

**Critério de conclusão:** Dois sabores podem coexistir no estado e a mensagem de lista vazia aparece adequadamente.

### 4. Conversa, revisão e autonomia

- **Explique:** Quando usar v-for e quando usar v-if? O que acontece se um sabor novo for acrescentado ao array de opções?
- **Desafio extra:** Acrescente um novo sabor ao catálogo sem copiar mais um bloco de HTML.
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
