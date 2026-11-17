# DevLab

Plataforma web de apoio a minicursos de tecnologia, desenvolvida por estudantes do TADS / IFPR Campus Foz do Iguaçu no Projeto de Extensão II. É uma iniciativa estudantil, não um sistema oficial do IFPR. O primeiro minicurso é **Já Vue.js? — A arte de desenvolver com Vue.js**, com o mascote Vuati.

**Site publicado:** https://cziemann07.github.io/devlab/

## Stack

- Vue 3 (SFC, `<script setup>`, Composition API)
- Vite + TypeScript (`strict`, checagem com `vue-tsc`)
- Vue Router com `createWebHashHistory()`
- Markdown (`markdown-it`) e destaque de sintaxe (`shiki`) processados **somente no build**
- CSS puro com tokens em `src/styles/tokens.css`
- Fontes locais: Inter Variable e JetBrains Mono
- Deploy no GitHub Pages via GitHub Actions

## Execução local

```bash
npm ci
npm run dev
```

Build de produção e pré-visualização:

```bash
npm run build
npm run preview
```

O `build` executa a checagem de tipos e a validação do conteúdo. Qualquer erro de conteúdo interrompe o build.

## Estrutura

```
content/
  README.md                    # como publicar apostila, slides, questionários e desafios
  index.ts                     # site + registro dos cursos
  cursos/vue-github/
    index.ts                   # exporta o CourseContent do curso
    encontros/*.md             # textos de preparação e encontros
    exercicios/<id>/
      enunciado.md
      resolucao.md
    codigo/**                  # arquivos-fonte dos exemplos
public/
  materiais/vue-github/**      # arquivos locais (PDFs etc.)
build/content/                 # pipeline de conteúdo em tempo de build
src/
  types/content.ts             # contrato dos dados
  content/                     # consultas tipadas no cliente
  views/                       # CourseLanding, EncounterView, ExerciseView, NotFoundView
  components/                  # CodeBlock, Prose, ResourceList, HintList, ...
  styles/tokens.css            # tokens do design system
  assets/vuati/                # poses do mascote + regras de uso (README.md)
scripts/
  vuati-isolar-poses.py        # isola as poses da imagem-conceito (Python + Pillow)
```

## Identidade: plataforma × curso

A marca **DevLab** é neutra (off-white sobre grafite) e não depende da
tecnologia de nenhum curso. Cada curso pode definir `curso.tema` (cor de
destaque e uso do mascote); essa cor vale dentro do conteúdo do curso, enquanto
cabeçalho e rodapé mantêm a identidade DevLab.

## Landing contextual

A landing dá prioridade ao que importa no momento do estudante: antes do curso
(preparação), no dia de um encontro (atalhos para o encontro, exercícios e
código), entre encontros (revisão e próximo encontro) e depois (revisão e
questionário final). **A data muda só a prioridade visual**: todo conteúdo
publicado continua acessível pelo cronograma e pelas páginas internas.

Para conferir os estados, use `?simular=AAAA-MM-DD`, por exemplo
`/#/?simular=2026-11-25`.

## Como adicionar conteúdo

Todo o conteúdo estruturado fica em arquivos TypeScript dentro de `content/`. Textos longos ficam em Markdown. Nenhuma alteração de componente é necessária para adicionar um encontro, material, exercício ou resolução.

### Curso

1. Crie `content/cursos/<slug>/index.ts` exportando um `CourseContent`.
2. Registre o curso em `content/index.ts`.
3. Defina `site.cursoDestaque` com o slug do curso exibido em `/`.

Campos opcionais do curso exibidos na landing:

- `acesso`: condição de participação (ex.: `{ rotulo: 'Gratuito', detalhe: 'inscrições a confirmar' }`).
- `aviso`: aviso sobre o estado do conteúdo (`{ titulo, texto }`), útil enquanto parte do material é preliminar ou demonstrativa.

### Encontro

Adicione um item em `encontros` no `index.ts` do curso. Use `tipo: 'preparacao'` para a etapa inicial ou `tipo: 'encontro'` para os encontros com data e horário. O texto de apoio fica em `encontros/<arquivo>.md` e é referenciado em `descricao`.

### Material

Adicione um item em `materiais`. Para arquivo local, coloque o arquivo em `public/materiais/<slug>/` e use `localizacao: { arquivo: 'materiais/<slug>/<arquivo>' }`. Para URL externa, use `localizacao: { url: 'https://...' }`. Materiais sem `encontroId` aparecem nas referências gerais do curso.

### Exercício e resolução

Adicione um item em `exercicios` com `enunciado` apontando para `exercicios/<id>/enunciado.md`. A resolução é um campo do exercício:

```ts
resolucao: {
  status: 'publicado', // ou 'em_breve'
  origem: 'demonstrativo',
  explicacao: 'exercicios/<id>/resolucao.md',
  codigoIds: ['codigo-da-solucao'],
}
```

Uma resolução `em_breve` não tem o texto nem o código enviados ao navegador. Para liberar, altere o status para `publicado` e faça um novo deploy.

### Questionários e desafios

`questionarios` aponta para formulários externos (o DevLab não coleta
respostas) e `desafios` define quizzes de múltipla escolha resolvidos no
navegador, acessíveis em `/cursos/<slug>/desafios/<id>`. Detalhes e exemplos em
[`content/README.md`](content/README.md).

### Código

Arquivos-fonte ficam em `content/cursos/<slug>/codigo/`. Use `arquivo` (relativo à pasta do curso) ou `fonte` inline, nunca os dois. O campo `githubUrl` aponta para o arquivo completo no GitHub. O campo `papel` pode ser `exemplo`, `inicial` ou `final`.

## Disponibilidade e origem

- `status: 'rascunho'`: removido do build.
- `status: 'em_breve'`: apenas metadados; sem corpo, Markdown ou código no bundle.
- `status: 'publicado'`: conteúdo completo.
- `origem: 'demonstrativo'`: exibe o selo "Demonstrativo"; páginas de encontro e exercício exibem o aviso no topo.
- `origem: 'oficial'`: conteúdo validado pela equipe do minicurso.

Roteiros recebidos estão identificados como oficiais; exercícios complementares e exemplos adaptados têm identificação demonstrativa.

## Validação

O pipeline em `build/content/` valida identificadores, referências, arquivos locais, campos obrigatórios, consistência de status, datas/horários, vazamento de resoluções, cores do tema, links de questionários e estrutura dos desafios (alternativas e resposta correta). As mensagens informam curso, entidade, id, campo e a correção sugerida. Avisos não interrompem o build.

## Publicação

O deploy é automático a cada push na branch `main`:

1. `npm ci`
2. `npm run build`
3. Publicação do conteúdo de `dist/` no GitHub Pages

O workflow está em `.github/workflows/deploy.yml`. Pull requests para a `main` executam o mesmo `npm ci` + `npm run build` (`.github/workflows/ci.yml`), sem publicar, para que erros de tipo ou de conteúdo apareçam antes do merge. O `base` do Vite é `./` e o roteamento usa hash, então o site funciona tanto em `https://<usuario>.github.io/<repositorio>/` quanto em um domínio próprio sem reconfiguração.

## Identificação institucional

TADS · IFPR Campus Foz do Iguaçu · Projeto de Extensão II

## Trilha oficial por encontro

O encontro 01 reúne a Unidade 01 (Ecossistema Vue.js) e a Unidade 02 (Pizza Vue).
O encontro 02 reúne a Unidade 03 (To-Do List). As páginas de unidade organizam
leitura, apostila e missões canônicas, sem duplicar cadastros entre catálogos.

O curso possui 23 missões com código inicial e quatro aprofundamentos locais.
Núcleo, progressão e opcionais estão identificados em texto. A conclusão é manual,
salva somente no navegador; identificadores novos não herdam a conclusão das
atividades antigas.

`/#/playground` executa um `App.vue` inicial de cada missão, com JavaScript ou
TypeScript, execução automática/manual, restauração e mensagens de erro.
Somente imports de `vue` são suportados. A prévia fica isolada em iframe sandbox;
Router, múltiplos arquivos, Git e comandos npm pertencem ao projeto local.
Código com loop infinito ainda pode travar a aba. Não há limite de CPU.

As versões completas anteriores de Pizza/To-Do foram substituídas pelos iniciais.
Os aliases `?exemplo=pizza` e `?exemplo=todo-crud` abrem a primeira missão
correspondente. Guias dos ministrantes, soluções e PowerPoints permanecem fora
do repositório público. São publicados três PDFs de apostila e, provisoriamente,
dois PDFs de slides. Procedimento reversível em `content/README.md`.

## Verificação da trilha

```bash
npm run build
npm run verify:public
```

Com a prévia de produção rodando em `127.0.0.1:5178`, execute
`node tests/semana-academica.cjs`. Informe `PLAYWRIGHT_MODULE` e `CHROMIUM_PATH`
se necessário; `TEST_BASE_URL` permite outro endereço/subcaminho. Execute a mesma
suíte com `TEST_BROWSER=firefox` e o executável Firefox em `CHROMIUM_PATH`.
A suíte verifica os 23 iniciais, navegação por unidade/missão, restauração,
isolamento/erros, progresso, cinco PDFs e telas de 390/1440 px.
