**Conceitos:** ref(), interpolação e v-model · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** Como o resumo pode mostrar o nome digitado imediatamente?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

A função `ref()` cria um valor reativo. No script, normalmente consultamos ou alteramos `cliente.value`; no template, o Vue desempacota esse `ref`, por isso usamos `{{ cliente }}`. A diretiva `v-model` liga o valor do campo a esse estado. Em casos de campos vazios, `trim()` evita tratar espaços como nome preenchido.

### 3. Sua tarefa no playground

Crie um estado reativo para o nome do cliente, conecte-o ao campo e mostre no resumo. Se vazio, exiba “Não informado”.

**Experimente:** Experimente escrever “Ana” e apagar todo o texto. Observe se o resumo acompanha cada alteração.

**Critério de conclusão:** O nome aparece em tempo real, sem recarregar, inclusive quando o campo fica vazio.

### 4. Conversa, revisão e autonomia

- **Explique:** O que é diferente entre uma variável JavaScript comum e um ref conectado à interface?
- **Desafio extra:** Exiba “Olá, ...” acima do resumo quando o nome estiver preenchido.
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
