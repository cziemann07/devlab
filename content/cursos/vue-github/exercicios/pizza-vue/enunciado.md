Esta atividade organiza os pontos de controle do **roteiro prático oficial da aula 1**, disponível nos materiais do encontro. A prática tem 82 minutos contados a partir do início do laboratório.

## Antes de começar

Abra a base com HTML e CSS fornecidos pelos ministrantes. O ZIP ainda aguarda envio; consulte o inventário para acompanhar a disponibilidade. Mantenha a versão completa separada da base inicial, conforme a orientação da equipe.

Execute `npm run dev`. Confira como `main.js` monta `App.vue` no elemento `#app` e se o CSS é importado por `main.js`.

## Etapas

1. **00–10 min · Base e primeiro commit.** Confira o repositório e a branch, configure a autoria com `--local` e registre a interface estática. Se a base já tiver Git, use o repositório existente.
2. **10–24 min · Nome e tamanho.** Use `ref`, `v-model`, `v-for`, `:value` e `:key`. Mostre o nome no resumo e trate o campo vazio com `v-if` e `v-else`.
3. **24–38 min · Sabores.** Gere os checkboxes, vincule-os ao array de seleção e use `join` no resumo. Confira também o estado sem sabores.
4. **38–56 min · Quantidade e total.** Comece em 1, limite de 1 a 10 e use `@click`. Derive o tamanho escolhido e o total com `computed`.
5. **56–65 min · Testes e segundo commit.** Ligue a confirmação a um alerta e confira os controles antes de registrar a versão funcional.
6. **65–82 min · GitHub.** Confira o remoto, envie a branch `main` e verifique os dois commits no navegador.

## Confira antes do segundo commit

- Digitar e apagar o nome atualiza o resumo.
- O tamanho pequeno é a opção inicial.
- Marcar dois sabores e desmarcar ambos atualiza a lista e a mensagem de seleção vazia.
- Os botões não permitem quantidade menor que 1 ou maior que 10.
- Duas pizzas médias totalizam R$ 70,00; duas grandes, R$ 90,00.
- Confirmar o pedido exibe o alerta simulado.

## Comandos em linhas separadas

O PDF original une dois comandos na página 2. A sequência para leitura é:

```bash
git status
git diff
git add src/App.vue
git commit -m "Implementa formulario e resumo reativo"
git log --oneline
```

Prepare também `main.js` e `style.css` antes do commit se esses arquivos tiverem mudado. Ao final, confira no GitHub os arquivos, a branch `main` e os dois commits.
