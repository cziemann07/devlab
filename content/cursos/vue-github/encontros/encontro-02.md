O segundo encontro conecta o projeto ao mundo: versionamento, repositório remoto e publicação. Vamos transformar a pasta local em um projeto que qualquer pessoa pode acessar.

## Roteiro

1. Retomar o projeto iniciado no encontro 01.
2. Entender o que é um commit e como o Git guarda histórico.
3. Criar o repositório remoto no GitHub.
4. Enviar o projeto com `push`.
5. Configurar o GitHub Pages e acompanhar o deploy.

## Comandos que vamos usar

```bash
git status
git add .
git commit -m "feat: primeiro componente"
git push -u origin main
```

## Publicação

O GitHub Pages publica arquivos estáticos gerados pelo build. Neste projeto, o deploy é feito por um workflow do GitHub Actions a cada push na branch `main`.

> O título e os tópicos deste encontro seguem o planejamento preliminar do minicurso e podem mudar. O texto e os exemplos desta página são demonstrativos.
