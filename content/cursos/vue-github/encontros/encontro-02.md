## Da Pizza à lista de tarefas

Na primeira aula, os dados de um pedido mudavam a interface. Agora, vamos aplicar essa mesma ideia a uma To-Do List: uma lista que ajuda a organizar o que precisa ser feito.

## Os conceitos que vamos usar

- **Estado:** os dados que a aplicação guarda enquanto está aberta, como os campos do formulário e a lista de tarefas.
- **Eventos:** ações da pessoa, como clicar para adicionar ou excluir.
- **Renderização de listas:** mostrar na interface os itens presentes nos dados, sem repetir manualmente o HTML de cada tarefa.
- **Validação:** conferir o que foi preenchido antes de alterar a lista.

A equipe está fechando a sequência de implementação. Os materiais e exercícios abaixo servem de apoio; o ministrante orientará quais etapas serão trabalhadas durante o encontro.

## Começar pelo código base

A equipe enviou o repositório **todolist-vuejs-base**, disponível nos materiais abaixo. Ele contém o formulário e a listagem estática; a lógica será construída durante a aula.

Com Node.js, npm e Git prontos, abra o terminal na pasta em que guarda seus projetos:

```bash
git clone https://github.com/MathuCardoso/todolist-vuejs-base.git
cd todolist-vuejs-base
npm install
npm run dev
```

Abra no navegador o endereço que aparecer no terminal e deixe esse terminal aberto. Para parar o servidor, use `Ctrl+C`. Se já clonou o repositório, entre na pasta existente em vez de repetir o clone.

O clone já traz um repositório Git: não precisa executar `git init` nessa pasta. No final da aula, a equipe orientará o envio para o seu próprio GitHub.

## Fechar o projeto e enviar ao GitHub

No final da aula, vamos conferir o projeto, registrar as mudanças com Git e enviá-lo ao repositório pessoal no GitHub. **Enviar o código ao GitHub** é diferente de publicar um site na internet: nesta etapa, estamos falando do repositório do projeto.

Os comandos, o repositório e a autenticação serão orientados pela equipe no laboratório. Não exponha senha ou token na projeção ou nos arquivos do projeto.

Use os slides e a apostila como consulta. Os exercícios do playground continuam disponíveis para experimentar e retomar conceitos.
