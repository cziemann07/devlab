O segundo encontro desenvolve uma **SPA de cadastro de tarefas com Vue 3, Vue Router e Bootstrap**. O roteiro **Aula 2 · prática atualizada com Git**, páginas 1–5, define a condução: **160 minutos de prática**, com tempos relativos ao início. Seu apêndice preserva o projeto original; não repita a criação do projeto descrita nele quando já tiver clonado a base.

## Começar pelo clone

O [repositório enviado pelo ministrante](https://github.com/MathuCardoso/todolist-vuejs-curso) contém a versão completa, incluindo CRUD. Veja a [demonstração publicada](https://todolist-vuejs-curso.vercel.app/). Clone esse projeto para consulta e siga o ponto de partida indicado em aula: a main já contém funcionalidades que serão construídas por etapas.

```bash
git clone https://github.com/MathuCardoso/todolist-vuejs-curso.git todo-projeto
cd todo-projeto
git status
git remote -v
git config --local user.name "Seu Nome e Sobrenome"
git config --local user.email "seu_email_do_github@exemplo.com"
npm install
npm run dev
```

O clone já cria o repositório: **não execute `git init` nem recrie o projeto**. O `package.json` recebido exige Node.js `^22.18.0 || >=24.12.0`; confira com `node --version`.

## Estrutura, layout e rotas

`src/main.js` monta a aplicação e registra o roteador. `App.vue` envolve `<RouterView />` com `MainLayout`; o `<slot>` recebe a página atual. `src/router/routes.js` aponta para `src/pages/TodoList.vue`. Confira o alias `@` para `src/` e siga o Bootstrap previsto na base e no roteiro. O PDF usa uma versão alpha e classes específicas: não misture essas classes com outra versão sem adaptar o CSS. A conexão é necessária para o CDN.

## Reatividade e componentes

Comece com `todo` (objeto do formulário) e `todos` (array), ambos com `ref`. Ligue título e descrição por `v-model` e observe a interpolação atualizar enquanto digita.

Depois extraia `Button.vue` e `Input.vue`. Props recebem dados, emits notificam o pai e slot recebe conteúdo. No Input, `modelValue` recebe o texto e `update:modelValue` comunica a digitação:

```vue
<script setup>
defineProps({ modelValue: String, label: String, id: String, error: String })
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <label :for="id">{{ label }}</label>
  <input :id="id" :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)" />
  <p v-if="error">{{ error }}</p>
</template>
```

Use identificadores distintos para associar os rótulos aos campos.

## Cadastro, validação e CRUD

- Valide título e descrição antes de salvar, rejeitando também texto composto apenas por espaços.
- Gere um identificador estável e registre `created_at` ao cadastrar. Limpe o formulário após salvar.
- Liste com `v-for` e `:key`; mostre título, descrição e data formatada em português.
- Edite uma **cópia** (`{ ...item }`): digitar não deve modificar o card antes de salvar.
- Localize novamente o item pelo id ao salvar a edição. Não dependa de um índice antigo se outro item foi excluído.
- Peça confirmação antes de excluir e preserve as outras tarefas.

O playground demonstra esse fluxo em um único App.vue. A separação em arquivos, Router e Bootstrap é feita no projeto local. Os dados dos exemplos ficam em memória e somem ao reiniciar a prévia; persistência não faz parte do núcleo desta aula.

## Dois commits e envio ao repositório pessoal

Depois do layout:

```bash
git status
git add .
git commit -m "chore: setup inicial do TodoList com Vue e Bootstrap"
```

Depois de testar cadastro, validação, edição e exclusão:

```bash
git status
git add .
git commit -m "feat: adicionada logica de criar editar e excluir tarefas"
git log --oneline
```

Crie um repositório vazio na sua conta. Como `origin` já veio do clone, **altere** o endereço, substituindo os marcadores:

```bash
git remote -v
git remote set-url origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git branch -M main
git push -u origin main
```

Confira no GitHub os arquivos e os dois commits. Publicar um site no Pages não é requisito desta prática.

## Fechamento e laboratório

Se houver tempo, execute `npm run build` e `npm run preview`. Siga a autenticação orientada pelos ministrantes, não coloque tokens no código ou na URL e encerre as sessões ao terminar. Só realize a limpeza local orientada depois de conferir o envio.

## Referência original e adaptações

Os PDFs foram preservados. Prefira a consulta visual ou os arquivos do repositório: extratores de PDF podem reordenar linhas e chaves. O playground usa mensagens e confirmação na página em lugar de `alert`/`confirm`, mantém os exemplos em um único arquivo e acrescenta validação de espaços em branco. No projeto local, siga a separação de componentes indicada no roteiro.
