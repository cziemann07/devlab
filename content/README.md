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
