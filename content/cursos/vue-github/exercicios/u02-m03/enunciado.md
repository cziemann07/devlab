**Conceitos:** select, dados e computed() · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** O preço unitário pode ser escolhido manualmente pelo cliente?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

Um `select` mantém a escolha do usuário em `tamanho`. Um catálogo de objetos associa **identificador**, **nome exibido** e **preço**. `computed()` descreve um valor que depende de outro valor reativo: quando `tamanho` muda, o preço unitário se recalcula sem que alguém precise reescrever o resumo. O operador `?.` protege a busca caso não encontre item; `?? 0` estabelece valor padrão.

### 3. Sua tarefa no playground

Represente pequena, média e grande como dados. Conecte a escolha de tamanho a um select e calcule o preço unitário a partir dessa escolha.

**Experimente:** Nesta adaptação didática, os preços-base são R$ 25, R$ 35 e R$ 45. Não são a única tabela possível.

**Critério de conclusão:** Trocar o tamanho altera corretamente o nome exibido e o preço-base; média = R$ 35.

### 4. Conversa, revisão e autonomia

- **Explique:** Se mudarmos o preço da pizza média no objeto de dados, quantos lugares da interface precisam ser corrigidos?
- **Desafio extra:** Mostre o nome do tamanho selecionado sem duplicar a lista de nomes em outro lugar.
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
