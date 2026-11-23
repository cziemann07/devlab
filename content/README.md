# Integração dos materiais das equipes

Guia para a Equipe 2 (e quem mais produzir material) publicar no DevLab sem
mexer em componentes. Todo o conteúdo fica em `content/cursos/vue-github/`
(caminhos abaixo relativos à raiz do repositório).

Depois de qualquer mudança, rode `npm run build`. A validação aponta o que
estiver faltando, com o arquivo e o campo. O PR roda o mesmo build.

## Marcos internos da organização

Estes marcos **não** aparecem na landing pública: não são aulas para os
participantes.

| Data | Marco | Itens |
|---|---|---|
| 10/11 | Apresentação | Feedback da apostila · Apresentação da Wiki (DevLab) · Feedback dos slides · Folder e Kahoot · Teste da primeira aula |
| 17/11 | Validação | Teste da segunda aula · Convite à turma do segundo semestre |

Encontros oficiais (públicos): 24/11 e 26/11, das 19h às 22h.

Para mostrar os estados da landing no dia 10/11, use a simulação de data:
`/#/?simular=2026-11-24` (dia do encontro 01), `2026-11-25` (entre encontros),
`2026-11-26` (dia do encontro 02) e `2026-11-28` (depois). A página indica que
está simulando.

## Apostila e slides (PDF)

1. Coloque o arquivo em `public/materiais/vue-github/`, por exemplo
   `apostila-encontro-01.pdf`.
2. No `index.ts` do curso, no material correspondente:

   ```ts
   {
     id: 'apostila-01',
     encontroId: '01',
     titulo: 'Apostila do encontro 01',
     tipo: 'pdf',
     localizacao: { arquivo: 'materiais/vue-github/apostila-encontro-01.pdf' },
     status: 'publicado',
     origem: 'oficial',
   }
   ```

3. O site mostra **Ver** (abre no visualizador de PDF do navegador, em nova aba,
   sem tirar o aluno da página do encontro) e **Baixar**.

Slides publicados em serviço externo (Google Slides, Canva) usam
`localizacao: { url: 'https://...' }`.

Enquanto o arquivo não existir, mantenha `status: 'em_breve'` e sem
`localizacao`: aparece "em breve" e nenhum link quebrado é gerado.

## Questionários

O DevLab **não coleta respostas**. Ele só aponta para o formulário externo da
organização.

```ts
questionarios: [
  {
    id: 'diagnostico',
    tipo: 'diagnostico',
    titulo: 'Questionário diagnóstico',
    descricao: '...',
    url: 'https://forms.gle/...',   // obrigatório para publicar
    status: 'publicado',
    origem: 'oficial',
  },
]
```

- Sem `status: 'publicado'`, o link não é enviado ao navegador.
- A landing dá prioridade ao diagnóstico antes do curso e ao final depois dele,
  mas os dois ficam acessíveis na seção Recursos sempre que publicados.

### Privacidade

Ao montar os formulários, peça só o necessário para a análise pedagógica:

- Prefira respostas anônimas. Se precisar comparar diagnóstico e final da
  mesma pessoa, use um código escolhido pelo participante em vez de nome, e-mail
  ou matrícula.
- Não peça CPF, telefone, endereço ou dados sensíveis.
- Diga no início do formulário para que os dados serão usados e por quem.
- Desative a coleta automática de e-mail quando não for necessária.

## Desafios (quiz)

Perguntas de múltipla escolha resolvidas no navegador, sem armazenamento nem
ranking. Não substituem o Kahoot, que é preparado por outro grupo.

```ts
desafios: [
  {
    id: 'primeiros-passos-vue',
    encontroId: '01',
    titulo: '...',
    resumo: '...',
    status: 'publicado',
    origem: 'oficial',
    perguntas: [
      {
        enunciado: 'Markdown em linha, ex.: `v-model`',
        alternativas: ['A', 'B', 'C', 'D'],  // 2 a 6
        correta: 1,                          // índice começando em 0
        explicacao: 'Por que a alternativa correta é a correta.',
      },
    ],
  },
]
```

O desafio atual é **demonstrativo**. As questões oficiais dependem do roteiro
pedagógico.

## Instruções por sistema operacional

Os computadores do laboratório usam Ubuntu, e participantes podem trazer
notebooks com Windows, macOS ou Linux. O que estará instalado no laboratório
ainda depende de confirmação da equipe.

Quando as instruções forem definidas, escreva-as no Markdown da preparação
(`encontros/preparacao.md`) com uma seção por sistema (`## Ubuntu (laboratório)`,
`## Windows`, `## macOS`). Para comandos, crie um código por sistema em
`codigos`, com títulos como `terminal · Ubuntu`. Não presuma `sudo` nos
computadores institucionais.

## Identidade do curso

- `curso.titulo` / `curso.tituloDestaque` / `curso.subtitulo`: nome oficial.
- `curso.tema.destaque`: cor da edição (a marca DevLab continua neutra).
- `curso.tema.mascote`: exibe o Vuati. Regras em [`src/assets/vuati/README.md`](../src/assets/vuati/README.md).

## Atividades, desafios de programação e playground

Exercícios publicados aparecem em `/cursos/<slug>/atividades`. Use `tipo: 'desafio'`
para exibi-los no catálogo de desafios de programação; o quiz de múltipla escolha
continua em `desafios` no contrato do curso. `playgroundExemplo` liga a atividade a um
id de `src/content/playground-examples.ts` (por exemplo `pizza` ou `todo-crud`).
A conclusão manual usa o par slug/id; mantenha esses identificadores estáveis.
Textos de apoio adaptados devem continuar marcados como demonstrativos.


## Edição oficial — unidades por encontro (17/11/2026)

A fonte da trilha atual é `projeto-vue.zip`, SHA-256
`ee27cd30c7c4e8b402676b39897033642c008d4b41cffbbaaadd19ec0b6191ff`.
As instruções desta seção prevalecem sobre exemplos genéricos de publicação acima.

| Fonte | Destino canônico |
| --- | --- |
| Unidade 01 — apostila do aluno | `unidades/01.md`, missões `u01-m01`–`u01-m09`, opcional `u01-componentes` |
| Unidade 02 — apostila do aluno | `unidades/02.md`, missões `u02-m01`–`u02-m07`, opcional `u02-componentes` |
| Unidade 03 — apostila do aluno | `unidades/03.md`, missões `u03-m01`–`u03-m07`, opcionais `u03-componentes` e `u03-rotas` |
| Apostilas PDF | `public/materiais/vue-github/oficiais/apostila-unidade-01.pdf` até `03.pdf` |
| Apresentações PDF | `public/materiais/vue-github/oficiais/slides-aula-01.pdf` e `02.pdf` |
| Guias, mediação, soluções, PowerPoints e projetos finais | Permanecem no pacote original com a equipe, fora do repositório público |

Os textos conceituais e os fechamentos de `wiki/` foram consolidados na leitura da
unidade; enunciados apontam para códigos iniciais cadastrados uma vez. A preparação
e as páginas dos encontros usam o cronograma consolidado. Os PDFs públicos são
preservados sem alterações; na Unidade 01 foi escolhida a apostila diretamente
na pasta `01/`, cuja capa não tem a sobreposição vista na cópia aninhada.

### Substituições

Foram retirados os seis PDFs antigos: `roteiro-aula-01-teoria.pdf`,
`roteiro-aula-01-pratica.pdf`, `projeto-aula-01.pdf`, `plano-aula-02.pdf`,
`projeto-aula-02.pdf` e `pratica-aula-02.pdf`, além dos três apoios Markdown
anteriores. Os exemplos completos e resoluções da trilha anterior também foram
retirados da árvore atual. Recuperação técnica pelo histórico Git, sem arquivo
histórico público ou reescrita de histórico.

Os IDs antigos apontam para os sucessores em `redirecionamentos` no cadastro do
curso. Essa relação não transfere progresso: uma missão nova tem seu próprio ID.
Os projetos finais externos não são oferecidos como pontos de partida das missões.
O PDF e o quiz do Kahoot permanecem removidos.

### Retirar provisoriamente os slides

A decisão atual permite somente os PDFs dos slides. Para revertê-la:

1. Nos dois materiais `slides-01` e `slides-02` do cadastro do curso, mudar
   `status` para `em_breve` e retirar `localizacao`.
2. Retirar os dois `slides-aula-*.pdf` de `public/materiais/vue-github/oficiais/`.
   Apenas mudar o status não impede o acesso direto ao arquivo.
3. Rodar `npm run build` e `node tests/oficiais-publicacao.cjs --sem-slides`.
4. Conferir que só as três apostilas estão no resultado e que nenhum link de
   slide é gerado. Adequar a expectativa de publicação do CI à decisão aprovada.
5. Para restaurar, recuperar os dois PDFs originais da pasta privada da equipe
   ou do commit autorizado, restaurar os cadastros, rodar o build, a verificação
   normal de publicação e aguardar o CI verde antes de publicar.

Esta reversão não exige alterar componentes, unidades, apostilas ou missões.
Guias e PowerPoints não devem ser adicionados ao Git durante o procedimento.

### Ambiente local e limites

Missões de componentes/Router utilizam o projeto que a dupla construiu.
Criar o projeto local com Vite e copiar apenas o código inicial da missão atual;
não distribuir `projeto-local/` recebido, pois contém o resultado completo.
Git fica no terminal, com autoria local; push e autenticação pessoal não são
requisitos do núcleo. Não há banco de dados, persistência das tarefas ou checkout.


## Revisão do hub — 23/11/2026

A apresentação por unidades descrita na entrega de 17/11 foi substituída por
páginas de aula. As unidades permanecem como metadados dos exercícios, sem páginas
longas na jornada principal. Os textos de referência de `unidades/*.md` não são
mais enviados ao cliente.

As **duas apostilas finais ainda serão recebidas**. Adaptar seu conteúdo para
`encontros/encontro-01.md` e `encontros/encontro-02.md`, organizando explicações,
exemplos e sumário. Não confundir essa tarefa com juntar PDFs ou acrescentar
somente um botão de download. Os PDFs atuais são consulta anterior, não uma
confirmação das apostilas finais. Reconciliar os cadastros de material quando as
novas fontes chegarem, sem duplicar recursos.

A base `MathuCardoso/todolist-vuejs-base`, enviada por Felipe, tem registro único
`codigo-base-todo` nos materiais. É exibida na aula 2 e no Inventário. A inspeção
de App.vue no commit `837dafb` confirmou formulário/lista estáticos. O package.json
exige Node `^22.18.0 || >=24.12.0`. Não substituir os iniciais do playground por
esse projeto nem presumir que a base da Pizza foi confirmada.

Os questionários usam `liberarEm` opcional (AAAA-MM-DD). O inicial está publicado
sem esse campo; o final usa `2026-11-26`. `availableQuestionnaires` aplica a mesma
regra em todas as entradas, usando a data real em São Paulo. `?simular=` altera
prioridades da landing e não antecipa formulários. Antes da data, o serviço Google
continua fora do controle da wiki; nenhuma permissão externa foi alterada.

As verificações de navegador incluem liberação na virada do dia, dropdown,
aliases, códigos iniciais e armazenamento. Guias, gabaritos, histórico e a reversão
provisória dos slides mantêm os limites já registrados.
