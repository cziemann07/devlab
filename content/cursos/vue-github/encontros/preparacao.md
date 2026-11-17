## Comece pelo navegador

O playground do DevLab permite estudar os códigos iniciais no navegador, sem instalar ferramentas. Abra a Unidade 01 para conhecer o ecossistema e siga o encontro correspondente.

## Para o laboratório e os extras

Confira com a equipe a disponibilidade de Node.js/npm, Git, VS Code e a extensão Vue - Official. Node.js deve ser compatível com a versão do Vite usada ao criar o projeto. Comandos de terminal e projetos com vários arquivos são executados no computador, fora do playground.

```bash
node --version
npm --version
git --version
```

As unidades Pizza e To-Do explicam como preparar um projeto local com Vite. O código inicial da missão é seu ponto de partida, não um projeto final pronto.

## Git no computador compartilhado

Confirme a pasta e execute `git status`. Use `git init -b main` somente se ela ainda não for um repositório. Configure a autoria apenas nesse projeto:

```bash
git config --local user.name "Nome da dupla"
git config --local user.email "email@exemplo.com"
git status
git add .
git commit -m "Registra o ponto de partida"
git log --oneline
```

Registre uma segunda etapa após evoluir e testar a aplicação. Não é preciso fazer push nem autenticar uma conta pessoal para concluir o núcleo. Não compartilhe senhas ou tokens; siga as orientações da equipe para o uso do laboratório.
