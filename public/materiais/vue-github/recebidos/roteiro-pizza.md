# Roteiro — Dia 1, parte 2: Pizza Vue (20:30 às 22:00)

**Disciplina:** Projeto de Extensão — TADS
**Duração:** 90 minutos
**Produto final:** formulário de pedido de pizzaria com resumo e total atualizados em tempo real (Vue 3 + Vite)
**Foco:** 100% em Vue. O HTML e o CSS são entregues prontos aos alunos.

---

## O que será visto

| Conceito | Onde aparece no projeto |
|---|---|
| `ref` | `nome`, `tamanhoSelecionado`, `saboresSelecionados`, `quantidade` |
| `{{ }}` (interpolação) | Valores no resumo do pedido |
| `v-model` | Campo de nome, select de tamanho, checkboxes de sabores |
| `v-for` | Opções do select e checkboxes de sabores |
| `@click` | Botões `-`, `+` e "Confirmar pedido" |
| `computed` | `tamanhoEscolhido` e `total` |
| `v-if` / `v-else` | Cliente "Não informado" e sabores "Nenhum sabor selecionado" |
| `watch` (bônus) | Limitar os sabores conforme o tamanho |

---

## Cronograma

| Horário | Min | Etapa |
|---|---|---|
| 20:30 | 10 | 0. Preparação: colocar o HTML e o CSS no projeto |
| 20:40 | 15 | 1. `ref`, `{{ }}` e `v-model` (campo de nome) |
| 20:55 | 20 | 2. `v-for` e `v-model` com array (tamanho e sabores) |
| 21:15 | 10 | 3. Eventos e `ref` numérico (quantidade) |
| 21:25 | 15 | 4. `computed` (tamanho escolhido e total) |
| 21:40 | 10 | 5. `v-if` e `v-else` (resumo) |
| 21:50 | 10 | 6. Confirmar pedido, commit e push |

> **Se faltar tempo:** a etapa 5 pode ser mostrada por você, sem os alunos digitarem. O `watch` (bônus) só entra se sobrar tempo; senão, vira desafio para casa.

---

## 0. Preparação: colocar o HTML e o CSS no projeto (20:30 – 20:40)

Os alunos já têm o projeto criado na primeira parte da aula (Hello World, já no GitHub). Agora recebem dois arquivos prontos: `style.css` e o HTML do formulário.

### 0.1 Copiar o CSS

Colocar o arquivo `style.css` fornecido em `src/style.css`.

### 0.2 Ligar o CSS no `index.html`

Adicionar a linha do `<link>` dentro do `<head>`:

```html
<link rel="stylesheet" href="src/style.css" />
```

O `index.html` fica assim:

```html
<!doctype html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pizza Vue</title>
        <link rel="stylesheet" href="src/style.css" />
    </head>
    <body>
        <div id="app"></div>
        <script type="module" src="/src/main.js"></script>
    </body>
</html>
```

### 0.3 Colocar o HTML no `src/App.vue`

Substituir todo o conteúdo do `App.vue` por este material fornecido (HTML puro, **sem nenhum código Vue**):

```vue
<script setup>
</script>

<template>
    <main class="container">
        <header class="header">
            <h1>Pizza <span>Vue</span></h1>
            <p>Monte seu pedido e aproveite!</p>
        </header>

        <div class="content">
            <div class="form">
                <label for="nome">Seu nome</label>
                <input type="text" id="nome" placeholder="Digite seu nome..." />

                <label for="tamanho">Tamanho da pizza</label>
                <select id="tamanho">
                    <option value="p">Pequeno - R$ 25.00</option>
                    <option value="m">Médio - R$ 35.00</option>
                    <option value="g">Grande - R$ 45.00</option>
                </select>

                <p class="section-label">Escolha os sabores</p>

                <div class="sabores">
                    <label class="checkbox">
                        <input type="checkbox" value="Calabresa" />
                        <span>Calabresa</span>
                    </label>
                    <label class="checkbox">
                        <input type="checkbox" value="Frango com catupiry" />
                        <span>Frango com catupiry</span>
                    </label>
                    <label class="checkbox">
                        <input type="checkbox" value="Portuguesa" />
                        <span>Portuguesa</span>
                    </label>
                </div>

                <label>Quantidade de pizzas</label>
                <div class="quantidade">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </div>

                <button>Confirmar pedido</button>
            </div>

            <aside class="resumo">
                <h2>Resumo do pedido</h2>

                <div class="resumo-item">
                    <span>Cliente:</span>
                    <span>Não informado</span>
                </div>

                <div class="resumo-item">
                    <span>Tamanho:</span>
                    <span>Pequeno</span>
                </div>

                <div class="resumo-item">
                    <span>Sabores:</span>
                    <span>Nenhum sabor selecionado</span>
                </div>

                <div class="resumo-item">
                    <span>Quantidade:</span>
                    <span>1</span>
                </div>

                <div class="total">
                    <span>Total:</span>
                    <strong>R$ 25.00</strong>
                </div>
            </aside>
        </div>

        <footer class="mensagem">Seu pedido está quase pronto!</footer>
    </main>
</template>
```

### 0.4 Conferir e apresentar o objetivo

Com o `npm run dev` rodando, a página mostra o formulário completo, **mas nada funciona**: digitar não altera o resumo, os botões não fazem nada e o total é fixo.

**Fala sugerida:** "O visual está pronto. Nossa missão nos próximos 80 minutos é dar vida a essa página usando Vue."

> ✅ **Ponto de controle:** a página aparece com o visual escuro e verde, sem erros no console (F12).

---

## 1. `ref`, `{{ }}` e `v-model` (20:40 – 20:55)

**Objetivo:** o nome digitado aparece no resumo em tempo real.

### 1.1 Criar o estado

No `<script setup>`:

```vue
<script setup>
    import { ref } from "vue";

    const nome = ref("");
</script>
```

**Explicar:**

- `ref("")` cria um valor **reativo**: quando ele muda, a tela se atualiza sozinha.
- No `<script>`, acessamos o valor com `nome.value`. No `<template>`, basta `nome` (o Vue "desembrulha" automaticamente).

### 1.2 Ligar o campo com `v-model`

```vue
<input
    type="text"
    id="nome"
    v-model="nome"
    placeholder="Digite seu nome..."
/>
```

### 1.3 Mostrar o valor no resumo com `{{ }}`

Trocar `Não informado` por `{{ nome }}`:

```vue
<div class="resumo-item">
    <span>Cliente:</span>
    <span>{{ nome }}</span>
</div>
```

**Explicar:**

- `v-model` liga o campo ao dado **nos dois sentidos**: digitou, o dado muda; o dado mudou, o campo muda.
- `{{ }}` mostra o valor e atualiza sozinho.
- **Momento "uau":** peça que digitem e vejam o resumo mudando letra por letra.

> ✅ **Ponto de controle:** digitar o nome atualiza o campo "Cliente" do resumo em tempo real. (Com o campo vazio, a linha fica em branco — resolvemos isso na etapa 5.)

---

## 2. `v-for` e `v-model` com array (20:55 – 21:15)

**Objetivo:** gerar o select e os checkboxes a partir de dados, e acompanhar a escolha no resumo.

### 2.1 Criar os dados e o estado

Atualizar o `<script setup>`:

```vue
<script setup>
    import { ref } from "vue";

    const nome = ref("");

    const tamanhos = [
        {
            label: "Pequeno",
            id: "p",
            preco: 25.0,
        },
        {
            label: "Médio",
            id: "m",
            preco: 35.0,
        },
        {
            label: "Grande",
            id: "g",
            preco: 45.0,
        },
    ];
    const sabores = ["Calabresa", "Frango com catupiry", "Portuguesa"];

    const tamanhoSelecionado = ref(tamanhos[0].id);
    const saboresSelecionados = ref([]);
</script>
```

**Explicar:** `tamanhos` e `sabores` são dados fixos (não precisam de `ref`, pois nunca mudam). Já `tamanhoSelecionado` e `saboresSelecionados` mudam com a interação, então são `ref`.

### 2.2 Gerar as opções do select com `v-for`

Substituir as três `<option>` fixas por uma só:

```vue
<label for="tamanho">Tamanho da pizza</label>
<select id="tamanho" v-model="tamanhoSelecionado">
    <option
        v-for="tamanho in tamanhos"
        :key="tamanho.id"
        :value="tamanho.id"
    >
        {{ tamanho.label }} - R$ {{ tamanho.preco.toFixed(2) }}
    </option>
</select>
```

**Explicar:**

- `v-for="tamanho in tamanhos"` repete a tag para cada item do array.
- `:key` é um identificador único de cada item, para o Vue saber qual é qual.
- `:value` (com dois-pontos) é o **binding**: o valor vem de uma expressão JavaScript, e não de um texto fixo.
- `.toFixed(2)` mostra duas casas decimais.

### 2.3 Gerar os checkboxes de sabores

Substituir os três `<label class="checkbox">` por um só:

```vue
<div class="sabores">
    <label class="checkbox" v-for="sabor in sabores" :key="sabor">
        <input
            type="checkbox"
            :value="sabor"
            v-model="saboresSelecionados"
        />
        <span>{{ sabor }}</span>
    </label>
</div>
```

**Explicar:** quando `v-model` está ligado a um **array** num checkbox, o Vue adiciona o `value` ao array ao marcar e remove ao desmarcar.

### 2.4 Mostrar a escolha no resumo (provisório)

Para enxergar a reatividade, ligue o resumo temporariamente:

```vue
<div class="resumo-item">
    <span>Tamanho:</span>
    <span>{{ tamanhoSelecionado }}</span>
</div>

<div class="resumo-item">
    <span>Sabores:</span>
    <span>{{ saboresSelecionados.join(", ") }}</span>
</div>
```

- Em "Tamanho" aparece `p`, `m` ou `g` (o `id`). Isso é de propósito: **na etapa 4 vamos mostrar o nome certo com `computed`**.
- `.join(", ")` transforma o array em texto: `Calabresa, Portuguesa`.

> ✅ **Ponto de controle:** o select lista os três tamanhos; marcar sabores atualiza a linha "Sabores"; trocar o tamanho muda a letra em "Tamanho".

---

## 3. Eventos e `ref` numérico (21:15 – 21:25)

**Objetivo:** os botões `-` e `+` controlam a quantidade, de 1 a 10.

### 3.1 Criar o estado e as funções

Adicionar ao `<script setup>`:

```js
const quantidade = ref(1);

function adicionarPizza() {
    if (quantidade.value >= 10) return;
    quantidade.value++;
}

function removerPizza() {
    if (quantidade.value <= 1) return;
    quantidade.value--;
}
```

**Explicar:** dentro das funções (`<script>`), usamos `.value`. O `return` antecipado impede passar dos limites.

### 3.2 Ligar os botões com `@click`

```vue
<label>Quantidade de pizzas</label>
<div class="quantidade">
    <button @click="removerPizza">-</button>
    <span>{{ quantidade }}</span>
    <button @click="adicionarPizza">+</button>
</div>
```

### 3.3 Mostrar a quantidade no resumo

```vue
<div class="resumo-item">
    <span>Quantidade:</span>
    <span>{{ quantidade }}</span>
</div>
```

**Explicar:** `@click` é a forma abreviada de `v-on:click`. Ele executa a função quando o elemento é clicado.

> ✅ **Ponto de controle:** os botões mudam a quantidade na tela e no resumo, parando em 1 e em 10.

---

## 4. `computed` (21:25 – 21:40)

**Objetivo:** mostrar o nome do tamanho escolhido e calcular o total automaticamente.

### 4.1 Importar e criar os valores calculados

Atualizar o import e adicionar ao `<script setup>`:

```js
import { computed, ref } from "vue";
```

```js
const tamanhoEscolhido = computed(() => {
    return tamanhos.find((tamanho) => tamanho.id === tamanhoSelecionado.value);
});

const total = computed(() => {
    return tamanhoEscolhido.value.preco * quantidade.value;
});
```

**Explicar:**

- `computed` é um valor que **depende de outros valores reativos** e se recalcula sozinho quando eles mudam.
- `tamanhoEscolhido`: procura no array o objeto cujo `id` é o selecionado.
- `total`: preço do tamanho × quantidade. Se trocar o tamanho **ou** a quantidade, o total muda.
- Por que não uma função comum? O `computed` guarda o resultado e só recalcula quando algo de que ele depende muda.
- Dentro do script usamos `.value` também em um `computed`.

### 4.2 Usar no resumo

Trocar o tamanho provisório e o total fixo:

```vue
<div class="resumo-item">
    <span>Tamanho:</span>
    <span>{{ tamanhoEscolhido.label }}</span>
</div>
```

```vue
<div class="total">
    <span>Total:</span>
    <strong>R$ {{ total.toFixed(2) }}</strong>
</div>
```

**Demonstração:** trocar o tamanho para "Grande" e aumentar a quantidade para 3 → total de `R$ 135.00`.

> ✅ **Ponto de controle:** o resumo mostra "Pequeno", "Médio" ou "Grande", e o total muda ao alterar o tamanho ou a quantidade.

---

## 5. `v-if` e `v-else` (21:40 – 21:50)

**Objetivo:** mostrar mensagens padrão quando não há nome ou sabores.

### 5.1 Cliente

```vue
<div class="resumo-item">
    <span>Cliente:</span>
    <span v-if="!nome">Não informado</span>
    <span v-else>{{ nome }}</span>
</div>
```

### 5.2 Sabores

```vue
<div class="resumo-item">
    <span>Sabores:</span>
    <span v-if="saboresSelecionados.length === 0">Nenhum sabor selecionado</span>
    <span v-else>
        {{ saboresSelecionados.join(", ") }}
    </span>
</div>
```

**Explicar:**

- `v-if` só renderiza o elemento quando a condição é verdadeira; o `v-else` aparece quando é falsa. O `v-else` precisa vir **logo depois** do `v-if`.
- `!nome` é verdadeiro quando o texto está vazio.
- Diferença entre `v-if` e `v-show` (opcional): `v-if` remove o elemento do HTML; `v-show` só o esconde com CSS.

> ✅ **Ponto de controle:** com tudo vazio aparece "Não informado" e "Nenhum sabor selecionado"; ao digitar e marcar, os valores aparecem.

---

## 6. Confirmar pedido, commit e push (21:50 – 22:00)

### 6.1 Botão "Confirmar pedido"

No `<script setup>`:

```js
function enviarPedido() {
    alert("Pedido enviado!");
}
```

No template:

```vue
<button @click="enviarPedido">Confirmar pedido</button>
```

### 6.2 Enviar para o GitHub

```bash
git add .
git commit -m "Formulário de pedido de pizza com Vue"
git push
```

### 6.3 Recapitulação rápida

| Conceito | Para que serve |
|---|---|
| `ref` | Guardar um valor que a tela acompanha |
| `v-model` | Ligar campos de formulário aos dados |
| `{{ }}` | Mostrar valores na tela |
| `v-for` | Repetir elementos a partir de uma lista |
| `@click` | Reagir a cliques |
| `computed` | Valores calculados a partir de outros |
| `v-if` / `v-else` | Mostrar ou esconder conforme uma condição |

**Gancho para o Dia 2:** "Hoje tudo ficou num único arquivo. No próximo dia vamos dividir em **componentes**, usar `props` e `emit`, e construir um CRUD completo."

---

## Bônus: `watch` (só se sobrar tempo, ou desafio para casa)

**Ideia:** cada tamanho permite um número máximo de sabores (Pequeno: 1, Médio: 2, Grande: 3). Ao diminuir o tamanho, os sabores excedentes são removidos.

### Passo 1: adicionar `maxSabores` aos tamanhos

```js
const tamanhos = [
    { label: "Pequeno", id: "p", preco: 25.0, maxSabores: 1 },
    { label: "Médio", id: "m", preco: 35.0, maxSabores: 2 },
    { label: "Grande", id: "g", preco: 45.0, maxSabores: 3 },
];
```

### Passo 2: importar e criar o `watch`

```js
import { computed, ref, watch } from "vue";
```

```js
watch(tamanhoSelecionado, () => {
    const limite = tamanhoEscolhido.value.maxSabores;
    saboresSelecionados.value = saboresSelecionados.value.slice(0, limite);
});
```

### Passo 3: bloquear os checkboxes que passam do limite

```vue
<input
    type="checkbox"
    :value="sabor"
    v-model="saboresSelecionados"
    :disabled="
        !saboresSelecionados.includes(sabor) &&
        saboresSelecionados.length >= tamanhoEscolhido.maxSabores
    "
/>
```

**Explicar o contraste:**

| `computed` | `watch` |
|---|---|
| **Calcula um valor** a partir de outros | **Executa uma ação** quando um valor muda |
| Retorna algo e é usado no template | Não retorna nada; altera outros dados ou faz efeitos |
| Ex.: o `total` | Ex.: cortar os sabores excedentes |

> **Teste:** escolher "Grande", marcar 3 sabores e trocar para "Pequeno" → sobra só 1 sabor marcado.

---

## Apêndice A — `App.vue` final (referência)

```vue
<script setup>
    import { computed, ref } from "vue";

    const nome = ref("");

    const tamanhos = [
        {
            label: "Pequeno",
            id: "p",
            preco: 25.0,
        },
        {
            label: "Médio",
            id: "m",
            preco: 35.0,
        },
        {
            label: "Grande",
            id: "g",
            preco: 45.0,
        },
    ];
    const sabores = ["Calabresa", "Frango com catupiry", "Portuguesa"];

    const tamanhoSelecionado = ref(tamanhos[0].id);

    const tamanhoEscolhido = computed(() => {
        return tamanhos.find(
            (tamanho) => tamanho.id === tamanhoSelecionado.value,
        );
    });

    const saboresSelecionados = ref([]);
    const quantidade = ref(1);

    function adicionarPizza() {
        if (quantidade.value >= 10) return;
        quantidade.value++;
    }

    function removerPizza() {
        if (quantidade.value <= 1) return;
        quantidade.value--;
    }

    const total = computed(() => {
        return tamanhoEscolhido.value.preco * quantidade.value;
    });

    function enviarPedido() {
        alert("Pedido enviado!");
    }
</script>

<template>
    <main class="container">
        <header class="header">
            <h1>Pizza <span>Vue</span></h1>
            <p>Monte seu pedido e aproveite!</p>
        </header>

        <div class="content">
            <div class="form">
                <label for="nome">Seu nome</label>
                <input
                    type="text"
                    id="nome"
                    v-model="nome"
                    placeholder="Digite seu nome..."
                />

                <label for="tamanho">Tamanho da pizza</label>
                <select id="tamanho" v-model="tamanhoSelecionado">
                    <option
                        v-for="tamanho in tamanhos"
                        :key="tamanho.id"
                        :value="tamanho.id"
                    >
                        {{ tamanho.label }} - R$ {{ tamanho.preco.toFixed(2) }}
                    </option>
                </select>

                <p class="section-label">Escolha os sabores</p>

                <div class="sabores">
                    <label class="checkbox" v-for="sabor in sabores" :key="sabor">
                        <input
                            type="checkbox"
                            :value="sabor"
                            v-model="saboresSelecionados"
                        />
                        <span>{{ sabor }}</span>
                    </label>
                </div>

                <label>Quantidade de pizzas</label>
                <div class="quantidade">
                    <button @click="removerPizza">-</button>
                    <span>{{ quantidade }}</span>
                    <button @click="adicionarPizza">+</button>
                </div>

                <button @click="enviarPedido">Confirmar pedido</button>
            </div>

            <aside class="resumo">
                <h2>Resumo do pedido</h2>

                <div class="resumo-item">
                    <span>Cliente:</span>
                    <span v-if="!nome">Não informado</span>
                    <span v-else>{{ nome }}</span>
                </div>

                <div class="resumo-item">
                    <span>Tamanho:</span>
                    <span>{{ tamanhoEscolhido.label }}</span>
                </div>

                <div class="resumo-item">
                    <span>Sabores:</span>
                    <span v-if="saboresSelecionados.length === 0"
                        >Nenhum sabor selecionado</span
                    >
                    <span v-else>
                        {{ saboresSelecionados.join(", ") }}
                    </span>
                </div>

                <div class="resumo-item">
                    <span>Quantidade:</span>
                    <span>{{ quantidade }}</span>
                </div>

                <div class="total">
                    <span>Total:</span>
                    <strong>R$ {{ total.toFixed(2) }}</strong>
                </div>
            </aside>
        </div>

        <footer class="mensagem">Seu pedido está quase pronto!</footer>
    </main>
</template>
```

> O arquivo `style.css` é o fornecido aos alunos e não precisa ser alterado.

---

## Apêndice B — Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Página sem estilo | Falta o `<link>` no `index.html` ou o `style.css` não está em `src/` | Conferir o caminho `src/style.css` e reiniciar o `npm run dev` |
| Nada acontece ao digitar | Falta o `v-model` ou o nome na variável está diferente | Conferir `v-model="nome"` e `const nome = ref("")` |
| `nome is not defined` no console | Variável usada no template, mas não criada (ou sem `<script setup>`) | Declarar no `<script setup>` |
| Aparece `[object Object]` ou `p` no resumo | Usando `tamanhoSelecionado` em vez de `tamanhoEscolhido.label` | Ver etapa 4.2 |
| `Cannot read properties of undefined (reading 'label')` | `tamanhoSelecionado` sem valor inicial | Iniciar com `ref(tamanhos[0].id)` |
| Quantidade fica `[object Object]` ou `NaN` | Esqueceu o `.value` dentro da função | Usar `quantidade.value++` |
| Total não atualiza | `total` criado sem `computed`, ou sem `.value` dentro dele | Conferir etapa 4.1 |
| Texto `{{ nome }}` aparece literal na tela | Colocou `{{ }}` dentro de um atributo | Em atributos, usar `:atributo="valor"` |
| `v-else` não funciona | Há algo entre o `v-if` e o `v-else` | Deixá-los em elementos vizinhos, sem nada no meio |
| `git push` pede login | Autenticação do GitHub não configurada | Usar o Git Credential Manager ou autenticar pelo navegador |

## Dicas para condução

- Programe **ao vivo**, uma etapa por vez, e use os pontos de controle antes de avançar.
- Peça que os alunos **digitem** em vez de colar. Reservar a colagem só para o HTML da etapa 0.
- Mantenha a estrutura de cada etapa: explicar → digitar → ver o resultado na tela.
- Se alguém ficar para trás, ele pode copiar o código da etapa anterior deste roteiro e continuar.
- Deixe o repositório do projeto final aberto para consulta.