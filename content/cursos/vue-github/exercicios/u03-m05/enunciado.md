**Conceitos:** Bootstrap, classes e responsividade · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** O formulário fica compreensível e utilizável em uma tela pequena?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

Bootstrap oferece classes como `container`, `py-4`, `card`, `form-control` e `btn`. Essas classes ajudam na apresentação, mas **não substituem a reatividade de Vue**. No laboratório, o projeto local carrega Bootstrap por CDN; se o navegador estiver sem acesso à rede, estilos básicos incluídos nos componentes continuam garantindo uma interface utilizável.

### 3. Sua tarefa no playground

Compare a versão atual com uma versão que utiliza container, card, form-control e btn. Aplique classes, mas não mude as regras da lista.

**Experimente:** Teste a página no tamanho de um celular usando DevTools. Se o CSS remoto não carregar, use os estilos locais de apoio.

**Critério de conclusão:** A interface permanece funcional, com espaçamentos e campos legíveis em tela pequena.

### 4. Conversa, revisão e autonomia

- **Explique:** Bootstrap substitui Vue.js? Quais partes da página mudaram e quais comportamentos permaneceram iguais?
- **Desafio extra:** Teste uma classe Bootstrap diferente e explique por que a escolheu.
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
