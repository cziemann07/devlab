**Trilha:** v-for · arrays · :key · **Tempo sugerido:** 7–9 min · **Etapa:** Progressão.

**Situação-problema.** A pizzaria tem vários sabores. Faz sentido escrever três `<li>` separados e repetidos?

**Antes de mexer.** Quantos itens devem aparecer antes de modificar o array? Escreva uma previsão em uma frase.

**Seu desafio.** Crie um `<ul>` com `<li v-for="sabor in sabores" :key="sabor">` e mostre o nome de cada sabor.

**Primeira pista (abra só se necessário).** Use `v-for` para percorrer e `:key` para identificar cada item.

**Perguntas de investigação.** Como a interface descobre quantos itens precisa renderizar? O que acontece ao adicionar um novo sabor ao array no script?

**Transferência para outro contexto.** Na To-Do List, substitua sabores por uma lista de tarefas.

**O que conta como conquista?** A quantidade de itens renderizados acompanha o array. Explique o caminho para outra pessoa, mesmo que o código dela seja diferente.
