**Conceitos:** Estrutura HTML e componente de arquivo único · **Formato:** duplas com alternância de papéis · **Arquivo inicial:** o código inicial da missão

### 1. O problema antes da solução

**Pergunta geradora:** A pessoa consegue reconhecer onde digitar o nome e escolher o tamanho?

Antes de tocar no teclado, converse com sua dupla e escreva uma hipótese: **qual dado precisa existir, qual ação o usuário fará e que mudança deverá aparecer na tela?**

### 2. Descubra o recurso

Um componente de arquivo único (`.vue`) pode reunir **lógica** em `<script setup>`, **marcação** em `<template>` e **aparência** em `<style>`. Elementos como `label`, `input`, `select` e `button` continuam sendo HTML; Vue acrescenta comportamento declarativo. A existência do formulário não garante, por si só, que seus dados estejam ligados ao resumo.

### 3. Sua tarefa no playground

Identifique no arquivo o bloco de lógica, a área de marcação e as regras de estilo. Troque o título do formulário e melhore o texto que explica o que deve ser preenchido.

**Experimente:** O primeiro código é intencionalmente estático. Mudanças no input não atualizam o resumo.

**Critério de conclusão:** O formulário aparece sem erros, com h1, label e campos identificáveis.

### 4. Conversa, revisão e autonomia

- **Explique:** Um campo sem rótulo claro pode excluir pessoas. Como você tornaria o formulário compreensível?
- **Desafio extra:** Inclua um texto auxiliar explicando que o pedido é apenas uma simulação.
- **Relato em dupla:** identifique uma linha alterada, descreva o antes/depois e formule um teste que outra dupla poderia reproduzir.

> **Pista de mediação:** releia o código inicial e procure identificar **estado**, **evento** e **resultado visível**. Faça dois testes próprios antes de pedir uma pista.
