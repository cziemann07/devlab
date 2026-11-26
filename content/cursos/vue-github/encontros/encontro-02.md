Na Pizza Vue, você ligou os campos de um pedido a um resumo na tela. Agora vai usar a mesma reatividade para cadastrar, listar, editar e excluir tarefas. Siga as seis missões com o professor. A apostila original está em **Materiais da aula** e no **Inventário**.

## 1. Preparar o projeto e as rotas

Comece com um projeto novo. No terminal, confira Node.js, npm e Git e abra o assistente do Vue:

```bash
node -v
npm -v
git --version
npm create vue@latest todo-projeto
```

Selecione JavaScript e Vue Router. Entre em `todo-projeto`, execute `npm install` e depois `npm run dev`. Abra o endereço indicado no terminal.

Ligue o Bootstrap em `index.html`. Em `src/main.js`, registre o router antes de montar a aplicação em `#app`. Crie a página `TodoList.vue` e o layout `MainLayout.vue`. Configure a rota inicial para mostrar a página dentro do layout usando `RouterView`.

**Confira:** a rota inicial mostra “Cadastro de Tarefas” com os estilos aplicados. Registre o primeiro commit com a estrutura e as rotas antes de seguir.

## 2. Conectar o formulário

Em `TodoList.vue`, guarde o título e a descrição num objeto reativo com `ref`. Ligue os campos com `v-model` e mostre uma prévia do título no template. Dentro do script, acesse o objeto por `.value`.

**Confira:** ao digitar ou apagar uma letra, a prévia muda imediatamente.

## 3. Reutilizar campos e botões

Extraia o campo para `Input.vue`. Ele recebe o valor do componente pai pela prop `modelValue` e emite `update:modelValue` quando o aluno digita. Assim o formulário continua usando `v-model` mesmo com um componente próprio.

Em `Button.vue`, use um slot para o conteúdo do botão. Deixe a ação de salvar, editar ou excluir na página que conhece a lista. Acrescente os ícones conforme o guia.

**Confira:** trocar o campo original pelo componente mantém a prévia funcionando. O botão continua acionando o evento esperado.

## 4. Construir a lista de tarefas

### Cadastrar e listar

Valide título e descrição com `trim()` para rejeitar campos só com espaços. Ao salvar, crie uma tarefa com ID estável e data de criação, acrescente-a ao array reativo e limpe o formulário. Mostre as tarefas com `v-for`, usando o ID como chave.

### Editar e cancelar

Carregue **uma cópia** da tarefa no formulário. Ao salvar, atualize o item com o mesmo ID. Ao cancelar, descarte a cópia. Teste cancelar depois de digitar: o texto original deve continuar no card.

### Excluir

Peça confirmação antes de remover. Cancele uma vez e confirme na segunda tentativa. Só a tarefa escolhida deve desaparecer.

## 5. Registrar e enviar ao GitHub

Com o cadastro, a edição e a exclusão funcionando, revise as alterações com `git status`, prepare os arquivos do projeto e faça o segundo commit. Use `git log --oneline` para localizar os dois marcos: estrutura com rotas e CRUD com validação.

Crie o repositório na sua conta. Confira o destino com `git remote -v`; se ainda não houver remoto, adicione a URL do seu repositório como `origin`. Envie a branch com `git push -u origin main` se ela se chamar `main`. No GitHub, confira os arquivos e os dois commits. No laboratório, siga a orientação do professor para autenticar e encerrar a sessão.

## 6. Testar o resultado

- Tente salvar campos vazios ou com espaços. Depois cadastre duas tarefas válidas.
- Edite uma tarefa, cancele e repita salvando. Compare os dois resultados.
- Exclua a última tarefa e cadastre outra. Confira se os IDs continuam únicos.
- Recarregue a página. A lista volta a ficar vazia porque os dados vivem na memória.
- Execute `npm run build` e confira o histórico com `git log --oneline`.

Se quiser praticar mais, experimente uma mensagem de lista vazia, um contador reativo ou a persistência com `localStorage`. São desafios opcionais da apostila.
