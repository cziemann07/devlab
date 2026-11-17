Construa o cadastro de tarefas seguindo as **páginas 1–5 do roteiro prático atualizado da aula 2**. Os 160 minutos são relativos ao início da prática. O apêndice serve como referência do código; sua criação de projeto não precisa ser repetida após clonar.

## Base e preparação

```bash
git clone https://github.com/MathuCardoso/todolist-vuejs-curso.git todo-projeto
cd todo-projeto
git config --local user.name "Seu Nome e Sobrenome"
git config --local user.email "seu_email_do_github@exemplo.com"
npm install
npm run dev
```

O repositório enviado contém a versão completa. Siga em aula o ponto inicial definido pelos ministrantes e use a main para consulta. O clone já cria o Git local, sem precisar de `git init`. Confira Node.js `^22.18.0 || >=24.12.0`.

## Etapas e pontos de controle

1. **00–30 min:** clone, identidade local, conceitos e estrutura do projeto.
2. **30–45 min:** layout, Router e Bootstrap; registrar o primeiro commit.
3. **45–65 min:** título e descrição reativos com `ref` e `v-model`.
4. **65–85 min:** componentes Input e Button com props, emits, slot e v-model customizado.
5. **85–105 min:** cadastro com validação, id estável, data e limpeza dos campos.
6. **105–125 min:** listagem, edição e exclusão; editar uma cópia e salvar pelo id.
7. **125–140 min:** testar e registrar o segundo commit.
8. **140–155 min:** alterar `origin` para seu repositório vazio e fazer push.
9. **155–160 min:** conferir arquivos e commits no GitHub; encerramento orientado.

## Teste antes de concluir

- Campos vazios não cadastram; confira também o caso de apenas espaços.
- Criar duas tarefas preserva os dados de ambas.
- Digitar durante a edição não altera o card antes de salvar.
- Excluir uma tarefa preserva as demais; cancelar a confirmação não remove nada.
- Editar uma tarefa depois de excluir outra não modifica o item errado.
- Os dados em memória somem ao recarregar a aplicação, como previsto no roteiro.

## Repositório pessoal

Crie um repositório vazio no GitHub. `origin` já existe após o clone; substitua os marcadores e use:

```bash
git remote -v
git remote set-url origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git branch -M main
git push -u origin main
```

Confira os dois commits antes de encerrar as sessões e realizar a limpeza orientada. A página do encontro reúne as explicações, os comandos de cada commit, a demonstração e os PDFs.
