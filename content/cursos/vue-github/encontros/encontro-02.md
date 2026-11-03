O segundo encontro conecta o projeto ao mundo: versionamento, repositório remoto e publicação. Vamos transformar a pasta local em um projeto que qualquer pessoa pode acessar.

## Roteiro

1. Entender o que é um commit e como o Git guarda histórico.
2. Criar o repositório remoto no GitHub.
3. Enviar o projeto com `push`.
4. Configurar o GitHub Pages e acompanhar o deploy.

## Comandos que vamos usar

```bash
git status
git add .
git commit -m "feat: primeiro componente"
git push -u origin main
```

## Publicação

O GitHub Pages publica arquivos estáticos gerados pelo build. Neste projeto, o deploy é feito por um workflow do GitHub Actions a cada push na branch `main`.

> O roteiro e os exemplos deste encontro são demonstrativos e podem mudar até a data do minicurso.
