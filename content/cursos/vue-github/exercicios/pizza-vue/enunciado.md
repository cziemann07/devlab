Construa o **Pizza Vue** seguindo o projeto atualizado da aula 1: 90 minutos, previstos das 20h30 às 22h. Consulte a explicação e os PDFs na página do encontro.

## Antes de começar

O [repositório do ministrante](https://github.com/MathuCardoso/projeto-vuejs-aula1) contém o resultado completo e `src/style.css`. Use o HTML inicial do PDF para a construção por etapas. O roteiro pressupõe um Hello World já criado e enviado ao GitHub na primeira parte da aula. No playground, o exemplo é uma referência adaptada em um arquivo único.

## Etapas

1. **00–10 min:** preparar o HTML e o CSS; abrir com `npm run dev` e conferir o console.
2. **10–25 min:** criar o nome com `ref`, ligar o campo com `v-model` e mostrar o nome no resumo.
3. **25–45 min:** gerar opções e checkboxes usando `v-for`, `:key` e `:value`; ligar sabores a um array.
4. **45–55 min:** implementar os botões de quantidade, respeitando os limites 1 e 10.
5. **55–70 min:** calcular tamanho escolhido e total com `computed`.
6. **70–80 min:** tratar nome e sabores vazios com `v-if` e `v-else`.
7. **80–90 min:** confirmar o pedido, testar, registrar um commit e enviar ao GitHub.

## Confira o resultado

- Apagar o nome mostra “Não informado”.
- Desmarcar todos os sabores mostra “Nenhum sabor selecionado”.
- Quantidade começa em 1 e nunca passa dos limites.
- Duas pizzas médias custam R$ 70,00; três grandes custam R$ 135,00.
- Confirmar mostra a mensagem simulada; no projeto local, o roteiro usa `alert`.
- O GitHub exibe o commit inicial e o da prática. Use `git status`, `git diff`, `git add`, `git commit` e só então `git push`.

O desafio **Pizza Vue · limite de sabores** propõe o bônus com `watch` para quem terminar ou quiser continuar em casa.
