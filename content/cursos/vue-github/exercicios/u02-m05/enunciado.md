**Conceitos:** eventos @click, métodos e :disabled · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** Uma pessoa deveria pedir zero pizzas ou onze pizzas nesta simulação?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

Eventos de clique são ligados com `@click`. Uma função pode conferir as regras antes de alterar `quantidade.value`. O atributo `:disabled` ajuda a comunicar o limite visualmente, mas a **regra também precisa existir na lógica**. Isso evita valores inválidos em situações não previstas pelo botão.

### 3. Sua tarefa no playground

Acrescente botões para aumentar e diminuir. Garanta que os valores permaneçam entre 1 e 10; desabilite o botão no limite.

**Experimente:** Faça dez cliques no botão de aumentar e depois dez no de diminuir. Teste também valor 1 e valor 10 diretamente.

**Critério de conclusão:** A quantidade nunca fica menor que 1 nem maior que 10, mesmo após muitos cliques.

### 4. Conversa, revisão e autonomia

- **Explique:** Desabilitar o botão basta para garantir a regra? Por que faz sentido validá-la também na função?
- **Desafio extra:** Descreva o limite de compra com texto acessível próximo aos botões.
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
