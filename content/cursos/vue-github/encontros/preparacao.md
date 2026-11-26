## 1. Abra um terminal

- **Windows:** procure “Prompt de Comando” no menu Iniciar. Também pode usar o terminal integrado do VS Code.
- **macOS:** abra o aplicativo Terminal.
- **Ubuntu/Linux:** abra o Terminal do sistema.

Digite um comando por vez e pressione Enter. Os comandos de verificação podem ser usados em qualquer pasta.

## 2. Confira Node.js e npm

Primeiro, execute:

```bash
node --version
```

Se aparecer um número começando com `v`, o Node foi encontrado. A base da To-Do List recebida exige **Node 22 a partir de 22.18.0, ou Node a partir de 24.12.0**. Uma versão antiga precisa ser atualizada.

Depois, confira o npm, que instala as dependências do projeto:

```bash
npm --version
```

Se aparecer um número, o npm também foi encontrado. Ele normalmente é instalado junto com o Node.

### Se o comando não for encontrado ou a versão for antiga

Abra o [download oficial do Node.js](https://nodejs.org/en/download) e escolha uma versão **LTS** compatível com a faixa acima.

- **Windows:** escolha o instalador para Windows (`.msi`), execute-o e conclua a instalação.
- **macOS:** escolha o instalador para macOS e conclua a instalação.
- **Ubuntu/Linux:** selecione Linux no site oficial e siga as instruções correspondentes. No laboratório, peça apoio à equipe se a instalação exigir permissão de administrador.

Feche o terminal, abra um novo e repita `node --version` e `npm --version`. Se o Node aparecer, mas o npm continuar ausente, confira se a instalação foi concluída. No Windows, se o PowerShell bloquear `npm.ps1`, faça a verificação pelo Prompt de Comando; não é necessário alterar a política de execução para esse teste.

## 3. Confira o Git

```bash
git --version
```

Se aparecer `git version` seguido de um número, ele foi encontrado.

Se o comando não existir, abra o [guia oficial de instalação do Git](https://git-scm.com/install/) e escolha Windows, macOS ou Linux. Depois da instalação, abra um novo terminal e repita o comando. No computador compartilhado do laboratório, peça apoio à equipe antes de instalar ferramentas.

## 4. Prepare o editor e sua conta

Instale o [Visual Studio Code](https://code.visualstudio.com/download), abra a área de extensões e procure **Vue - Official**, conforme a recomendação da base fornecida. Ela ajuda a editar arquivos `.vue`.

Para enviar o projeto ao final da aula 2, prepare uma [conta no GitHub](https://github.com/signup) e confirme o e-mail. Se já tem conta, confira se consegue acessá-la. Não compartilhe sua senha ou token na projeção, no chat ou dentro do código.

## 5. Abra a base da To-Do List

Para testar o ambiente antes da aula, você pode usar o [repositório de consulta da aula 2](https://github.com/MathuCardoso/todolist-vuejs-base). Durante a oficina, siga a apostila para criar um projeto novo.

Escolha uma pasta para seus projetos e abra o terminal nela. Execute:

```bash
git clone https://github.com/MathuCardoso/todolist-vuejs-base.git
cd todolist-vuejs-base
npm install
npm run dev
```

- `git clone` baixa a base com seu histórico Git.
- `cd` entra na pasta criada.
- `npm install` instala as dependências e precisa de conexão com a internet.
- A base também carrega o Bootstrap pela internet; mantenha a conexão para os estilos aparecerem.
- `npm run dev` inicia o servidor local. Abra **o endereço mostrado no terminal** no navegador e deixe o terminal aberto. Para parar, pressione `Ctrl+C`.

Se já clonou a base, entre na pasta existente; não repita o clone na mesma pasta. Se `npm` reclamar que não encontrou `package.json`, confira se você entrou em `todolist-vuejs-base` antes de instalar.

A base da Pizza que será usada pela equipe ainda precisa ser confirmada. Os exercícios do playground continuam disponíveis para estudar no navegador, sem instalar essas ferramentas.

## 6. Antes de registrar mudanças com Git

Dentro da pasta do projeto, confira:

```bash
git status
```

Como a base foi clonada, ela já é um repositório: não precisa executar `git init`. Configure sua identificação **apenas nesse projeto**, substituindo os exemplos pelos seus dados:

```bash
git config --local user.name "Seu Nome"
git config --local user.email "seu-email@exemplo.com"
```

Durante a aula, a equipe orientará quando registrar os commits e como enviar o resultado ao seu próprio repositório no GitHub. A autenticação e a troca do endereço remoto serão feitas com essa orientação.

## Pronto para começar?

- Node e npm respondem aos comandos e a versão do Node é compatível.
- Git responde a `git --version`.
- VS Code está pronto para editar `.vue`.
- Sua conta do GitHub está acessível.
- Você sabe abrir o projeto e localizar o endereço mostrado por `npm run dev`.

Se alguma etapa falhar, anote **o comando e a mensagem que apareceu** e mostre à equipe. Isso ajuda a identificar exatamente onde continuar.
