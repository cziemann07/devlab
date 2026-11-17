**Conceitos:** ref(), v-model, funções e validação · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** É correto cadastrar uma tarefa sem título ou descrição?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

Com `ref()`, os campos e o array de tarefas tornam-se reativos. `@submit.prevent` impede o recarregamento padrão do formulário. `trim()` remove espaços das bordas, evitando um título aparentemente preenchido apenas com espaços. Um `id` numérico simples serve para distinguir itens durante a sessão.

### 3. Sua tarefa no playground

Crie dois estados reativos para os campos, valide ambos com trim(), guarde novas tarefas em um array e limpe os campos somente quando a ação funcionar.

**Experimente:** Tente salvar tudo vazio; só o título; só a descrição; e os dois campos completos. Observe a mensagem de erro.

**Critério de conclusão:** Uma tarefa válida entra no array; entradas vazias são rejeitadas e avisadas.

### 4. Conversa, revisão e autonomia

- **Explique:** Por que limpar os campos antes de validar seria um problema para quem está usando o aplicativo?
- **Desafio extra:** Depois que o usuário digita uma entrada válida, faça a mensagem de erro desaparecer.
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
