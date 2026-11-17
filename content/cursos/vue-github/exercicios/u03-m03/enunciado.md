**Conceitos:** v-for, :key, v-if e computed() · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** Como exibir três tarefas sem escrever manualmente três cards?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

`v-for` cria uma representação visual por tarefa. `:key="tarefa.id"` usa uma identidade estável mesmo que títulos se repitam. `v-if` permite mostrar a mensagem de lista vazia. `computed()` fornece a contagem a partir do array, sem uma segunda contagem manual.

### 3. Sua tarefa no playground

Percorra o array com v-for, atribua uma chave única por id, exiba um estado vazio e calcule o total de tarefas.

**Experimente:** Cadastre duas tarefas com o mesmo título e verifique se ambas aparecem como itens distintos.

**Critério de conclusão:** Cada tarefa aparece no card, contador é coerente, vazio é mostrado quando necessário.

### 4. Conversa, revisão e autonomia

- **Explique:** Por que usar o título como chave poderia causar problemas com títulos repetidos?
- **Desafio extra:** Adicione a data de criação como detalhe visual, sem convertê-la em identificador.
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
