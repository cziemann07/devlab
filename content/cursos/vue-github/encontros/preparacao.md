Antes do primeiro encontro, reserve cerca de 30 minutos para deixar o ambiente pronto. Você não precisa saber programar em Vue para começar: o objetivo é só ter as ferramentas instaladas.

> Os computadores do laboratório usam Ubuntu. Quais ferramentas já estarão instaladas neles ainda será confirmado pela equipe do minicurso. Se for usar seu notebook (Windows, macOS ou Linux), deixe-o pronto com esta lista.

## Checklist

1. Tenha **Node.js e npm** compatíveis com o projeto fornecido pelos ministrantes. Os dois repositórios enviados exigem Node.js `^22.18.0 || >=24.12.0`; confira essa faixa antes de instalar as dependências.
2. Instale o **Git**.
3. Instale o **VS Code** e a extensão oficial **Vue - Official**.
4. Crie uma conta no **GitHub** e confirme o e-mail.

## Confira a instalação

Abra o terminal e execute os comandos do painel abaixo. Se as versões aparecerem, está tudo certo.

Se algum comando não for reconhecido, feche e abra o terminal novamente. Se o problema continuar, chegue 15 minutos antes do encontro que a equipe ajuda na configuração.

## Git no laboratório compartilhado

O plano oficial determina que a identificação seja feita **dentro do repositório de cada projeto**, com `git config --local`. Não use `--global` nos computadores compartilhados.

Depois de abrir ou criar o repositório, antes do primeiro commit:

```bash
git config --local user.name "Seu Nome e Sobrenome"
git config --local user.email "seu_email_do_github@exemplo.com"
git config --local --get user.name
git config --local --get user.email
```

Esses comandos precisam de um repositório Git existente. Na aula 2, o clone já cria esse repositório; a conferência de versões do painel abaixo pode ser feita antes.

Siga a orientação dos ministrantes para autenticar no GitHub. Conforme o plano, não salve credenciais na máquina compartilhada. Antes da limpeza local orientada pela equipe, confira no GitHub os arquivos e os commits enviados.

## Materiais para começar

Os repositórios [Pizza Vue](https://github.com/MathuCardoso/projeto-vuejs-aula1) e [TodoList](https://github.com/MathuCardoso/todolist-vuejs-curso) já estão disponíveis, assim como os roteiros oficiais nas páginas dos encontros. Eles contêm projetos completos: o ponto inicial de cada etapa é orientado pelo roteiro e pelos ministrantes. O CSS da Pizza está em `src/style.css` no repositório da aula 1.
