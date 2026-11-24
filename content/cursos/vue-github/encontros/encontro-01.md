Roteiro adaptado da **Apostila oficial da Aula 01 — Vue e GitHub**. Consulte o PDF original em **Materiais da aula** ou no **Inventário**.

## O que o Vue faz

O Vue.js é um framework JavaScript de código aberto criado por Evan You para construir interfaces. É progressivo: você pode adotá-lo numa parte de uma página ou usá-lo na aplicação inteira. O HTML estrutura a página, o CSS define o visual e o JavaScript descreve os dados e o comportamento.

Três ideias guiam o projeto: **reatividade** (a tela acompanha os dados), **componentização** (a interface é dividida em partes reutilizáveis) e **declaratividade** (você descreve o que a tela deve mostrar em cada estado). O Vue 3 usa Proxy para objetos reativos e oferece a Composition API. A oficina usa Vue 3 com Vite.

## Anatomia de um componente

Em `App.vue`, o `<template>` descreve a tela, o `<script setup>` concentra dados e lógica, e o `<style scoped>` pode guardar os estilos do componente. A Options API organiza o código em opções como `data` e `methods`; a Composition API permite agrupar a lógica por funcionalidade.

Quando a interface crescer, componentes podem trocar dados por **props** (do pai para o filho), **eventos** (do filho para o pai) e **slots** (conteúdo que o pai fornece). `provide` e `inject` ajudam quando descendentes em vários níveis precisam do mesmo dado.

## Estado e sintaxe do template

Use `ref()` para guardar escolhas, como o nome digitado, o ID do tamanho, os sabores e a quantidade. No JavaScript, leia ou escreva com `.value`; no template, use o nome diretamente. Use `computed()` para derivar informações, como o nome do tamanho a partir do ID e o total a partir do preço e da quantidade.

| Sintaxe | No pedido de pizza |
| --- | --- |
| `{{ nome }}` | Mostra o nome no resumo. |
| `v-model` | Liga um campo ao estado, nos dois sentidos. |
| `v-for` e `:key` | Repetem opções a partir da lista, identificadas pelo ID. |
| `:value` | Usa um valor do JavaScript como valor da opção. |
| `v-if` e `v-else` | Alternam entre o valor e uma mensagem para campo vazio. |
| `@click` | Executa a ação associada a um botão. |

## Git e GitHub

**Git** guarda versões localmente. Cada commit registra uma versão dos arquivos preparados. **GitHub** hospeda repositórios Git e oferece ferramentas de colaboração. Para começar com uma pasta comum, use `git init`; para copiar um repositório existente, use `git clone` com a URL obtida no botão **Code**. O clone já vem com Git configurado para aquele repositório.

Antes de registrar commits, configure sua autoria com `git config user.name "Seu nome"` e `git config user.email "seu@email.com"` dentro do projeto. Use `git status` para revisar alterações, `git add arquivo` para preparar um arquivo e `git commit -m "mensagem"` para registrar a versão. `git log --oneline` consulta o histórico. `git push` envia commits ao remoto e `git pull` traz alterações do remoto para a branch local.

## Pizza Vue: preparar a base

Use o HTML do formulário e o CSS entregues pela equipe. Se ainda precisar conferir Node.js, npm, Git ou o editor, abra a página **Preparação**.

1. **Abra o projeto Vue com Vite** no [repositório da oficina Pizza Vue](https://github.com/MathuCardoso/pizza-vue).
2. **Coloque o formulário** no bloco `<template>` de `src/App.vue`.
3. **Copie os estilos** para `src/style.css` e vincule o arquivo no `<head>` do `index.html`, como mostra a página 14.

**Como conferir:** abra a página no navegador. Antes de começar a etapa 1, o formulário deve aparecer com os estilos aplicados.

## Oficina Pizza Vue: seis etapas

### 1. Nome em tempo real

Crie o estado do nome, ligue o campo com `v-model` e mostre o valor com interpolação.

**Como conferir:** Digite e apague o nome. O resumo muda junto.

### 2. Tamanhos e sabores

Gere o seletor e os checkboxes com `v-for`, chaves estáveis e valores vinculados. Ligue os sabores a um array reativo.

**Como conferir:** Marcar adiciona o sabor ao array. Desmarcar remove. Por enquanto, o tamanho pode aparecer pelo ID.

### 3. Quantidade

Guarde a quantidade num `ref` numérico e conecte os botões de diminuir e aumentar com `@click`.

**Como conferir:** A quantidade aparece no resumo e fica entre 1 e 10.

### 4. Tamanho e total

Use `computed` para encontrar o tamanho pelo ID e calcular preço × quantidade.

**Como conferir:** Três pizzas grandes de R$ 45 devem dar R$ 135.

### 5. Campos vazios

Use `v-if` e `v-else` no nome e nos sabores para mostrar mensagens quando faltarem dados.

**Como conferir:** Apague o nome e desmarque todos os sabores. O resumo oferece as mensagens esperadas.

### 6. Confirmar e versionar

Conecte o botão de confirmação à ação de pedido e registre as mudanças no Git.

**Como conferir:** Teste o botão, confira `git status` e veja o commit no histórico.

A apostila também mostra como criar um repositório no GitHub, conectar o remoto e fazer `push`. Use essa parte como referência de publicação. A etapa de envio do projeto concluído ao GitHub permanece prevista para o fechamento da Aula 02. Se o fluxo solicitar autenticação, siga a orientação da equipe e mantenha as credenciais fora dos arquivos do projeto.

## Referências da apostila

- [Guia de Vue.js](https://vuejs.org/guide/introduction.html)
- [Documentação do Git](https://git-scm.com/doc)
- [Documentação do GitHub](https://docs.github.com/)
