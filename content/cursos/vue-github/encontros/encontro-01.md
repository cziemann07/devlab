O primeiro encontro combina **fundamentos de Vue.js e Git** com a construção do **Pizza Vue**, conforme os roteiros oficiais enviados pelos ministrantes.

## O que vamos construir

Um formulário de pedido de pizzaria com nome, tamanho, sabores, quantidade e resumo atualizado em tempo real. O total depende do tamanho e da quantidade. A confirmação do pedido é simulada por um alerta.

## Como a aula se organiza

- **Teoria · 60 minutos:** demonstração, história e adoção progressiva, vantagens e desvantagens, estado e reatividade, sintaxe do template e fluxo Git/GitHub.
- **Prática · 82 minutos:** partir da interface estática, implementar o formulário e o total, registrar dois commits e conferir o projeto no GitHub.
- **Revisão:** as sete perguntas recebidas no material do Kahoot também estão disponíveis como desafio interativo nesta página.

Os tempos da sequência abaixo reiniciam em zero em cada bloco. Eles são referências de duração dos PDFs, não horários do relógio. A condução do intervalo e dos demais momentos cabe aos ministrantes.

## Antes de começar

- Tenha o ambiente da etapa de preparação funcionando.
- Abra o VS Code na pasta do projeto.
- Deixe o terminal integrado visível: vamos usá-lo bastante.
- Confira nome e e-mail **locais ao repositório** antes de registrar commits, conforme as orientações de preparação.

## Código-base

O roteiro oficial pressupõe um ZIP com `App.vue`, `main.js` e `style.css` em `src/`, com HTML e CSS prontos. **Esse ZIP ainda aguarda envio pelos ministrantes**. Não confunda o roteiro com o projeto inicial completo.

Na preparação da base, o documento orienta usar JavaScript e manter `package.json` e `index.html` gerados pela ferramenta. O CSS é importado em `main.js`:

```js
import './style.css'
```

O Markdown de apoio contém o passo a passo com código recebido anteriormente. O PDF **Aula 1 · roteiro prático oficial** é a referência para conduzir a atividade.

## Pontos de controle

1. A interface estática abre e o primeiro commit registra a base.
2. Nome, tamanho e sabores aparecem no resumo; a seleção vazia tem uma mensagem.
3. A quantidade fica entre 1 e 10. Duas pizzas médias totalizam R$ 70,00 e duas grandes, R$ 90,00.
4. A confirmação exibe um alerta e o segundo commit registra a interface reativa.
5. O GitHub exibe a branch `main`, os arquivos e os dois commits.

## Nota de leitura do roteiro prático

Na página 2 do PDF original, `git diff` e `git add src/App.vue` aparecem unidos na mesma linha. Execute-os separadamente:

```bash
git status
git diff
git add src/App.vue
git commit -m "Implementa formulario e resumo reativo"
git log --oneline
```

Se `main.js` ou `style.css` também tiverem mudado, prepare esses arquivos antes do commit. O PDF disponível para download foi preservado como recebido; esta nota explicita o ajuste de leitura.
