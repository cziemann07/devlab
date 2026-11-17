**Conceitos:** data de criação e comunicação visual · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** Uma lista pode ajudar mais se mostrar quando a tarefa entrou?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

A data de criação é apenas um dado informativo associado a cada novo registro. Ela não substitui a chave única. Neste exercício, `toLocaleDateString('pt-BR')` produz uma data legível em português. Como a lista não é persistida, atualizar a aba faz os registros desaparecerem; isso é uma **limitação intencional** do projeto, não um bug de renderização.

### 3. Sua tarefa no playground

Acrescente a data formatada em português ao criar cada tarefa, sem afetar título, descrição ou identificação por id.

**Experimente:** Cadastre uma tarefa e confirme a data. Observe que recarregar a página perde os dados: este projeto não usa banco.

**Critério de conclusão:** A data aparece no card, e a aplicação continua aceitando inclusão, edição e exclusão.

### 4. Conversa, revisão e autonomia

- **Explique:** Por que a data é uma informação de apoio, mas o id precisa ser único?
- **Desafio extra:** Pesquise como guardar dados de forma persistente, sem implementar nesta unidade.
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
