**Conceitos:** computed() como valor derivado · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** Se o tamanho ou a quantidade mudar, quem deve recalcular a conta?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

`computed()` é apropriado para valores **derivados**: `total = precoUnitario × quantidade`. Não precisamos manter um `total` que alguém teria de atualizar manualmente a cada evento. Para exibir duas casas, `toFixed(2)` funciona; para uma interface brasileira mais cuidadosa, explore `Intl.NumberFormat`.

### 3. Sua tarefa no playground

Calcule total = preço unitário × quantidade. Use uma propriedade computada em vez de manter um terceiro estado editável.

**Experimente:** Teste: 2 médias → R$ 70,00; 2 grandes → R$ 90,00; trocar só o sabor não muda o total.

**Critério de conclusão:** Todos os testes de mesa conferem sem atualizar manualmente o total.

### 4. Conversa, revisão e autonomia

- **Explique:** Por que calcular o total a partir dos dados é mais seguro do que armazenar um número que alguém precisaria sincronizar?
- **Desafio extra:** Formate o total no padrão brasileiro com Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
