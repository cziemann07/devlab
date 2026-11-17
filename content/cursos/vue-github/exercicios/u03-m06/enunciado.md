**Conceitos:** edição com cópia para o formulário · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** É aceitável que o card mude antes de a pessoa clicar em Salvar edição?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

Para editar com segurança, o formulário recebe uma **cópia dos valores** do item (`titulo`, `descricao`) e mantém o `idEmEdicao`. O item no array só é alterado quando a pessoa salva. Isso permite cancelar sem modificar o original. É diferente de ligar o formulário diretamente a `tarefa.titulo`.

### 3. Sua tarefa no playground

Crie um modo de edição: copie título e descrição para os campos, permita salvar ou cancelar, e só altere o objeto da lista após confirmar o salvamento.

**Experimente:** Entre no modo de edição, mude o título e cancele. Depois edite novamente e salve. Observe o card nas duas situações.

**Critério de conclusão:** Cancelar preserva dados anteriores; salvar altera exatamente o item correspondente ao id.

### 4. Conversa, revisão e autonomia

- **Explique:** Qual a diferença entre editar uma referência compartilhada e editar uma cópia temporária?
- **Desafio extra:** Ao editar, coloque foco no campo de título (desafio de acessibilidade).
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
