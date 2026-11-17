**Conceitos:** eventos, identificação por id e decisão do usuário · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** O que acontece se uma pessoa clicar sem querer em Excluir?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

A exclusão deve usar o **identificador**, não a posição nem o título. A confirmação foi colocada na própria interface para funcionar também em playgrounds incorporados, onde janelas nativas podem ser bloqueadas. A função `filter()` cria uma nova lista sem o item selecionado. Cancelar só limpa o pedido de exclusão.

### 3. Sua tarefa no playground

Ao clicar em Excluir, peça confirmação dentro da própria interface. Se cancelar, preserve a tarefa. Se confirmar, filtre o array pelo id.

**Experimente:** Teste excluir a primeira, a última e uma tarefa quando existem títulos repetidos. Confirme também o comportamento de Cancelar.

**Critério de conclusão:** Cancelar preserva o item; confirmar remove apenas a tarefa escolhida.

### 4. Conversa, revisão e autonomia

- **Explique:** O que a confirmação protege? Que outras formas de desfazer uma ação poderiam existir?
- **Desafio extra:** Implemente um breve aviso “tarefa excluída” sem bloquear a aplicação.
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
