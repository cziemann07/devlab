O primeiro encontro combina **fundamentos de Vue.js e Git** com o **Pizza Vue**. A teoria segue o PDF de 60 minutos; a prática segue o projeto atualizado de 90 minutos, previsto das 20h30 às 22h. Os tempos da sequência abaixo são relativos a cada bloco.

## O que vamos construir

Um formulário com nome, tamanho, sabores e quantidade. O resumo acompanha os campos e o total é calculado com `computed`. A confirmação é simulada: não envia um pedido real.

## Preparação e primeira parte

Confira Node.js, npm, Git, VS Code e a extensão Vue - Official. O roteiro prático pressupõe um projeto Hello World já criado e enviado ao GitHub na primeira parte. Configure nome e e-mail com `git config --local` dentro desse projeto.

Um arquivo `.vue` reúne `<script setup>` (lógica), `<template>` (interface) e `<style>` (estilos). `src/main.js` monta `App.vue` no elemento `#app`. O Vue pode ser adotado em uma parte da interface; a reatividade mantém o HTML de acordo com o estado. No script, um `ref` usa `.value`; no template, o Vue o desembrulha.

A teoria também distingue Options API e Composition API, vantagens e limitações do framework e o fluxo `status → add → commit → push`. Commit registra localmente; push envia ao GitHub.

## Base da prática

O PDF **Aula 1 · projeto Pizza Vue atualizado** contém o HTML inicial e a referência final. O [repositório enviado pelo ministrante](https://github.com/MathuCardoso/projeto-vuejs-aula1) contém o projeto completo e o [style.css](https://github.com/MathuCardoso/projeto-vuejs-aula1/blob/main/src/style.css). Veja também a [demonstração publicada](https://projeto-vuejs-aula1.vercel.app/). O código da main já implementa a versão final; use o HTML inicial do PDF para a atividade. O playground oferece uma **adaptação didática em um único arquivo**, com estilos próprios, para praticar enquanto acompanha o roteiro.

No projeto local, siga a ligação de CSS indicada no PDF (`<link rel="stylesheet" href="src/style.css">` em `index.html`). Se a base já importar esse mesmo arquivo em `main.js`, mantenha uma única inclusão.

## Pontos de controle

1. **00–10 min:** abrir o HTML e CSS estáticos; conferir a interface e o console.
2. **10–25 min:** criar `nome` com `ref`, ligar o campo com `v-model` e mostrar `{{ nome }}` no resumo.
3. **25–45 min:** gerar tamanhos e checkboxes com `v-for`, `:key` e `:value`; usar um array para os sabores marcados.
4. **45–55 min:** ligar os botões com `@click`; quantidade começa em 1 e permanece entre 1 e 10.
5. **55–70 min:** derivar o tamanho e o total com `computed`. Três pizzas grandes devem custar R$ 135,00.
6. **70–80 min:** exibir “Não informado” e “Nenhum sabor selecionado” quando os campos estiverem vazios.
7. **80–90 min:** confirmar o pedido, testar, registrar o commit e fazer push.

## Comandos para concluir

Conforme o roteiro, registre o commit **antes** do push. Confira também as alterações e o histórico:

```bash
git status
git diff
git add .
git commit -m "Formulário de pedido de pizza com Vue"
git push
git log --oneline
```

Confira no GitHub o commit inicial e o da prática. Se o remoto ainda não estiver configurado, peça orientação antes do push.

## Bônus: watch

Cada tamanho permite 1, 2 ou 3 sabores. Um `watch` do tamanho corta a seleção excedente; os checkboxes restantes ficam desabilitados quando o limite é atingido. `computed` calcula valores; `watch` executa uma ação. O bônus é um desafio para casa se não houver tempo.

## Consulta do código

Consulte o PDF visualmente ou o repositório enviado pelo ministrante. A extração automática de texto pode trocar a ordem de linhas e chaves; confira os limites de `<script>`, `<template>` e funções antes de executar. O playground adapta a confirmação para uma mensagem na própria prévia; o projeto original usa `alert`.
