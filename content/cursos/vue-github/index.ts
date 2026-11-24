import type { CourseContent } from '../../../src/types/content'

export const vueGithub: CourseContent = {
  "curso": {
    "slug": "vue-github",
    "titulo": "Já Vue.js?",
    "tituloDestaque": "Vue.js",
    "subtitulo": "A arte de desenvolver com Vue.js",
    "descricao": "Aprenda Vue.js com missões progressivas: fundamentos e Pizza Vue no primeiro encontro; To-Do List no segundo. Preveja, experimente, teste e explique suas decisões.",
    "periodo": {
      "inicio": "2026-11-24",
      "fim": "2026-11-26"
    },
    "local": "IFPR Campus Foz do Iguaçu",
    "repositorioUrl": "https://github.com/cziemann07/devlab",
    "links": [
      {
        "rotulo": "Documentação do Vue",
        "url": "https://vuejs.org/guide/introduction.html"
      },
      {
        "rotulo": "GitHub Docs",
        "url": "https://docs.github.com/pt"
      }
    ],
    "acesso": {
      "rotulo": "Gratuito"
    },
    "tema": {
      "destaque": "#42b883",
      "tinta": "#0b0f14",
      "mascote": true
    }
  },
  "encontros": [
    {
      "id": "preparacao",
      "tipo": "preparacao",
      "titulo": "Prepare o ambiente",
      "resumo": "Confira Node.js, npm, Git e VS Code e aprenda a abrir a base do projeto no computador.",
      "status": "publicado",
      "origem": "oficial",
      "descricao": "encontros/preparacao.md",
      "sequencia": [
        {
          "titulo": "Navegador e playground"
        },
        {
          "titulo": "Projeto local para Git e extras"
        }
      ]
    },
    {
      "id": "01",
      "tipo": "encontro",
      "titulo": "Aula 01 · Vue, Git e Pizza",
      "resumo": "Conheça o Vue, entenda o papel do Git e pratique construindo o Pizza Vue.",
      "status": "publicado",
      "origem": "oficial",
      "descricao": "encontros/encontro-01.md",
      "data": "2026-11-24",
      "horario": {
        "inicio": "19:00",
        "fim": "22:00"
      },
      "local": "Laboratório de informática — IFPR Foz do Iguaçu",
      "sequencia": [
        {
          "titulo": "Teoria de Vue",
          "detalhe": "Componentes, reatividade, ref, computed e sintaxe do template."
        },
        {
          "titulo": "Teoria de Git",
          "detalhe": "Registrar a evolução do projeto e entender o papel do GitHub."
        },
        {
          "titulo": "Prática Pizza Vue",
          "detalhe": "Seguir as seis etapas da apostila, do nome reativo à confirmação do pedido."
        }
      ]
    },
    {
      "id": "02",
      "tipo": "encontro",
      "titulo": "Aula 02 · To-Do List e GitHub",
      "resumo": "Construa uma lista de tarefas e envie o projeto ao GitHub no final da aula.",
      "status": "publicado",
      "origem": "oficial",
      "descricao": "encontros/encontro-02.md",
      "data": "2026-11-26",
      "horario": {
        "inicio": "19:00",
        "fim": "22:00"
      },
      "local": "Laboratório de informática — IFPR Foz do Iguaçu",
      "sequencia": [
        {
          "titulo": "Construir a To-Do List",
          "detalhe": "Organizar dados e desenvolver os comportamentos da lista."
        },
        {
          "titulo": "Testar e revisar",
          "detalhe": "Conferir os casos de uso do projeto com a equipe."
        },
        {
          "titulo": "Enviar o projeto ao GitHub",
          "detalhe": "Registrar as mudanças com Git e enviar ao repositório pessoal."
        }
      ]
    }
  ],
  "unidades": [
    {
      "id": "01",
      "encontroId": "01",
      "titulo": "Ecossistema Vue.js",
      "resumo": "HTML, CSS, JavaScript, Vue e as ferramentas do projeto.",
      "descricao": "unidades/01.md",
      "apostilaId": "apostila-aula-01"
    },
    {
      "id": "02",
      "encontroId": "01",
      "titulo": "Pizza Vue",
      "resumo": "Do formulário estático ao pedido reativo, uma missão por vez.",
      "descricao": "unidades/02.md",
      "apostilaId": "apostila-aula-01"
    },
    {
      "id": "03",
      "encontroId": "02",
      "titulo": "To-Do List",
      "resumo": "Cadastrar, validar, listar e excluir tarefas com segurança.",
      "descricao": "unidades/03.md",
      "apostilaId": "apostila-03"
    }
  ],
  "materiais": [
    {
      "id": "apostila-aula-01",
      "encontroId": "01",
      "titulo": "Apostila oficial da Aula 01 · Vue e GitHub",
      "tipo": "pdf",
      "descricao": "PDF original da equipe, com fundamentos de Vue, Git e a oficina Pizza Vue.",
      "localizacao": {
        "arquivo": "materiais/vue-github/oficiais/apostila-aula-01.pdf"
      },
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "apostila-03",
      "encontroId": "02",
      "titulo": "Unidade 03 · To-Do List",
      "tipo": "pdf",
      "descricao": "Apostila do aluno · material oficial de estudo e consulta.",
      "localizacao": {
        "arquivo": "materiais/vue-github/oficiais/apostila-unidade-03.pdf"
      },
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "slides-01",
      "encontroId": "01",
      "titulo": "Slides oficiais da Aula 01 · Fundamentos e Ambiente",
      "tipo": "slides",
      "descricao": "Introdução ao Vue.js, configuração do ambiente e estrutura do primeiro projeto.",
      "localizacao": {
        "arquivo": "materiais/vue-github/oficiais/slides-aula-01.pdf"
      },
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "slides-02",
      "encontroId": "02",
      "titulo": "Slides · Aula 2 — To-Do List",
      "tipo": "slides",
      "descricao": "Apresentação oficial da aula em PDF.",
      "localizacao": {
        "arquivo": "materiais/vue-github/oficiais/slides-aula-02.pdf"
      },
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "livro-git",
      "encontroId": "02",
      "titulo": "Pro Git — livro gratuito",
      "tipo": "referencia",
      "descricao": "Referência completa de Git, em português.",
      "localizacao": {
        "url": "https://git-scm.com/book/pt-br/v2"
      },
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "referencia-mdn-js",
      "titulo": "MDN — JavaScript",
      "tipo": "referencia",
      "descricao": "Referência de JavaScript para consultar durante os exercícios.",
      "localizacao": {
        "url": "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"
      },
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "referencia-vue",
      "titulo": "Vue.js — guia oficial",
      "tipo": "referencia",
      "descricao": "Documentação oficial do framework.",
      "localizacao": {
        "url": "https://vuejs.org/guide/introduction.html"
      },
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "referencia-github",
      "titulo": "GitHub Docs",
      "tipo": "link",
      "descricao": "Documentação de repositórios, Actions e Pages.",
      "localizacao": {
        "url": "https://docs.github.com/pt"
      },
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "repositorio-aula-01",
      "encontroId": "01",
      "titulo": "Repositório da Aula 01 · Pizza Vue",
      "tipo": "codigo",
      "descricao": "Repositório da oficina Pizza Vue indicado pela equipe.",
      "localizacao": {
        "url": "https://github.com/MathuCardoso/pizza-vue"
      },
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "codigo-base-todo",
      "encontroId": "02",
      "titulo": "Código base · To-Do List",
      "tipo": "codigo",
      "descricao": "Ponto de partida da aula 2 enviado pela equipe: estrutura visual para implementar os comportamentos da lista.",
      "localizacao": {
        "url": "https://github.com/MathuCardoso/todolist-vuejs-base"
      },
      "status": "publicado",
      "origem": "oficial"
    }
  ],
  "exercicios": [
    {
      "id": "u01-m01",
      "encontroId": "01",
      "unidadeId": "01",
      "etapa": "nucleo",
      "codigo": "M01",
      "titulo": "ESTRUTURA QUE COMUNICA",
      "resumo": "Como alguém sabe qual campo deve preencher para pedir uma pizza?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u01-m01/enunciado.md",
      "codigoInicialIds": [
        "u01-m01"
      ],
      "playgroundExemplo": "u01-m01",
      "tipo": "atividade"
    },
    {
      "id": "u01-m02",
      "encontroId": "01",
      "unidadeId": "01",
      "etapa": "nucleo",
      "codigo": "M02",
      "titulo": "APARÊNCIA TAMBÉM COMUNICA",
      "resumo": "Uma página funciona, mas é difícil saber onde começa e termina o pedido. Como melhorar?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u01-m02/enunciado.md",
      "codigoInicialIds": [
        "u01-m02"
      ],
      "playgroundExemplo": "u01-m02",
      "tipo": "atividade"
    },
    {
      "id": "u01-m03",
      "encontroId": "01",
      "unidadeId": "01",
      "etapa": "nucleo",
      "codigo": "M03",
      "titulo": "DE ONDE VEM O TOTAL?",
      "resumo": "Duas pizzas custam mais que uma. Como mostrar isso na tela sem escrever o total manualmente?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u01-m03/enunciado.md",
      "codigoInicialIds": [
        "u01-m03"
      ],
      "playgroundExemplo": "u01-m03",
      "tipo": "atividade"
    },
    {
      "id": "u01-m04",
      "encontroId": "01",
      "unidadeId": "01",
      "etapa": "nucleo",
      "codigo": "M04",
      "titulo": "DIGITEI, APARECEU!",
      "resumo": "Como mostrar o nome do cliente enquanto ele digita, sem clicar em Enviar?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u01-m04/enunciado.md",
      "codigoInicialIds": [
        "u01-m04"
      ],
      "playgroundExemplo": "u01-m04",
      "tipo": "atividade"
    },
    {
      "id": "u01-m05",
      "encontroId": "01",
      "unidadeId": "01",
      "etapa": "progressao",
      "codigo": "M05",
      "titulo": "O PEDIDO NÃO PODE TER ZERO",
      "resumo": "E se uma pessoa clicar no botão de diminuir até a quantidade ficar negativa?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u01-m05/enunciado.md",
      "codigoInicialIds": [
        "u01-m05"
      ],
      "playgroundExemplo": "u01-m05",
      "tipo": "atividade"
    },
    {
      "id": "u01-m06",
      "encontroId": "01",
      "unidadeId": "01",
      "etapa": "progressao",
      "codigo": "M06",
      "titulo": "CALCULAR SEM REDIGITAR",
      "resumo": "Como manter o preço total correto sempre que a quantidade mudar?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u01-m06/enunciado.md",
      "codigoInicialIds": [
        "u01-m06"
      ],
      "playgroundExemplo": "u01-m06",
      "tipo": "atividade"
    },
    {
      "id": "u01-m07",
      "encontroId": "01",
      "unidadeId": "01",
      "etapa": "progressao",
      "codigo": "M07",
      "titulo": "QUANDO MOSTRAR UMA MENSAGEM?",
      "resumo": "Uma pizzaria fechada não deveria mostrar a mesma mensagem de uma aberta.",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u01-m07/enunciado.md",
      "codigoInicialIds": [
        "u01-m07"
      ],
      "playgroundExemplo": "u01-m07",
      "tipo": "atividade"
    },
    {
      "id": "u01-m08",
      "encontroId": "01",
      "unidadeId": "01",
      "etapa": "progressao",
      "codigo": "M08",
      "titulo": "UMA LISTA, VÁRIOS ITENS",
      "resumo": "A pizzaria tem vários sabores. Faz sentido escrever três `<li>` separados e repetidos?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u01-m08/enunciado.md",
      "codigoInicialIds": [
        "u01-m08"
      ],
      "playgroundExemplo": "u01-m08",
      "tipo": "atividade"
    },
    {
      "id": "u01-m09",
      "encontroId": "01",
      "unidadeId": "01",
      "etapa": "progressao",
      "codigo": "M09",
      "titulo": "UM CLIQUE, DOIS ESTADOS",
      "resumo": "Como deixar visualmente claro que uma pizza foi selecionada?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u01-m09/enunciado.md",
      "codigoInicialIds": [
        "u01-m09"
      ],
      "playgroundExemplo": "u01-m09",
      "tipo": "atividade"
    },
    {
      "id": "u01-componentes",
      "encontroId": "01",
      "unidadeId": "01",
      "etapa": "opcional",
      "codigo": "M10",
      "titulo": "Uma parte da interface conversa com outra",
      "resumo": "Crie um componente de resumo que receba um sabor por props e avise o pai sobre a intenção de remover com emit. Teste o fluxo de dados e a reutilização.",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u01-componentes/enunciado.md",
      "tipo": "desafio"
    },
    {
      "id": "u02-m01",
      "encontroId": "01",
      "unidadeId": "02",
      "etapa": "nucleo",
      "codigo": "P01",
      "titulo": "O formulário começa com uma pergunta",
      "resumo": "A pessoa consegue reconhecer onde digitar o nome e escolher o tamanho?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u02-m01/enunciado.md",
      "codigoInicialIds": [
        "u02-m01"
      ],
      "playgroundExemplo": "u02-m01",
      "tipo": "atividade"
    },
    {
      "id": "u02-m02",
      "encontroId": "01",
      "unidadeId": "02",
      "etapa": "nucleo",
      "codigo": "P02",
      "titulo": "O nome precisa aparecer enquanto digitamos",
      "resumo": "Como o resumo pode mostrar o nome digitado imediatamente?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u02-m02/enunciado.md",
      "codigoInicialIds": [
        "u02-m02"
      ],
      "playgroundExemplo": "u02-m02",
      "tipo": "atividade"
    },
    {
      "id": "u02-m03",
      "encontroId": "01",
      "unidadeId": "02",
      "etapa": "nucleo",
      "codigo": "P03",
      "titulo": "O tamanho muda o preço",
      "resumo": "O preço unitário pode ser escolhido manualmente pelo cliente?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u02-m03/enunciado.md",
      "codigoInicialIds": [
        "u02-m03"
      ],
      "playgroundExemplo": "u02-m03",
      "tipo": "atividade"
    },
    {
      "id": "u02-m04",
      "encontroId": "01",
      "unidadeId": "02",
      "etapa": "nucleo",
      "codigo": "P04",
      "titulo": "Um pedido aceita vários sabores",
      "resumo": "Por que um único texto não representa bem várias escolhas?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u02-m04/enunciado.md",
      "codigoInicialIds": [
        "u02-m04"
      ],
      "playgroundExemplo": "u02-m04",
      "tipo": "atividade"
    },
    {
      "id": "u02-m05",
      "encontroId": "01",
      "unidadeId": "02",
      "etapa": "nucleo",
      "codigo": "P05",
      "titulo": "Quantidades precisam respeitar acordos",
      "resumo": "Uma pessoa deveria pedir zero pizzas ou onze pizzas nesta simulação?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u02-m05/enunciado.md",
      "codigoInicialIds": [
        "u02-m05"
      ],
      "playgroundExemplo": "u02-m05",
      "tipo": "atividade"
    },
    {
      "id": "u02-m06",
      "encontroId": "01",
      "unidadeId": "02",
      "etapa": "nucleo",
      "codigo": "P06",
      "titulo": "O total não pode ficar desatualizado",
      "resumo": "Se o tamanho ou a quantidade mudar, quem deve recalcular a conta?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u02-m06/enunciado.md",
      "codigoInicialIds": [
        "u02-m06"
      ],
      "playgroundExemplo": "u02-m06",
      "tipo": "atividade"
    },
    {
      "id": "u02-m07",
      "encontroId": "01",
      "unidadeId": "02",
      "etapa": "opcional",
      "codigo": "P07",
      "titulo": "Uma simulação também precisa dar retorno",
      "resumo": "Como informar que o pedido foi finalizado sem simular uma compra real?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u02-m07/enunciado.md",
      "codigoInicialIds": [
        "u02-m07"
      ],
      "playgroundExemplo": "u02-m07",
      "tipo": "desafio"
    },
    {
      "id": "u02-componentes",
      "encontroId": "01",
      "unidadeId": "02",
      "etapa": "opcional",
      "codigo": "P08",
      "titulo": "Duas peças conversando",
      "resumo": "Separe o resumo do pedido em ResumoPedido.vue. O pai mantém os dados, envia props e recebe um evento para limpar o nome. Explique por que o filho não altera o estado do pai.",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u02-componentes/enunciado.md",
      "tipo": "desafio"
    },
    {
      "id": "u03-m01",
      "encontroId": "02",
      "unidadeId": "03",
      "etapa": "nucleo",
      "codigo": "T01",
      "titulo": "Que problema nossa lista precisa resolver?",
      "resumo": "Por que uma lista útil precisa mostrar tanto tarefas quanto a ação de criá-las?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u03-m01/enunciado.md",
      "codigoInicialIds": [
        "u03-m01"
      ],
      "playgroundExemplo": "u03-m01",
      "tipo": "atividade"
    },
    {
      "id": "u03-m02",
      "encontroId": "02",
      "unidadeId": "03",
      "etapa": "nucleo",
      "codigo": "T02",
      "titulo": "Uma tarefa em branco não resolve nada",
      "resumo": "É correto cadastrar uma tarefa sem título ou descrição?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u03-m02/enunciado.md",
      "codigoInicialIds": [
        "u03-m02"
      ],
      "playgroundExemplo": "u03-m02",
      "tipo": "atividade"
    },
    {
      "id": "u03-m03",
      "encontroId": "02",
      "unidadeId": "03",
      "etapa": "nucleo",
      "codigo": "T03",
      "titulo": "Uma lista precisa mostrar todos os itens",
      "resumo": "Como exibir três tarefas sem escrever manualmente três cards?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u03-m03/enunciado.md",
      "codigoInicialIds": [
        "u03-m03"
      ],
      "playgroundExemplo": "u03-m03",
      "tipo": "atividade"
    },
    {
      "id": "u03-m04",
      "encontroId": "02",
      "unidadeId": "03",
      "etapa": "nucleo",
      "codigo": "T04",
      "titulo": "Excluir exige confirmação",
      "resumo": "O que acontece se uma pessoa clicar sem querer em Excluir?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u03-m04/enunciado.md",
      "codigoInicialIds": [
        "u03-m04"
      ],
      "playgroundExemplo": "u03-m04",
      "tipo": "atividade"
    },
    {
      "id": "u03-m05",
      "encontroId": "02",
      "unidadeId": "03",
      "etapa": "opcional",
      "codigo": "T05",
      "titulo": "A aparência também comunica",
      "resumo": "O formulário fica compreensível e utilizável em uma tela pequena?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u03-m05/enunciado.md",
      "codigoInicialIds": [
        "u03-m05"
      ],
      "playgroundExemplo": "u03-m05",
      "tipo": "desafio"
    },
    {
      "id": "u03-m06",
      "encontroId": "02",
      "unidadeId": "03",
      "etapa": "opcional",
      "codigo": "T06",
      "titulo": "Editar sem salvar não deveria mudar o item",
      "resumo": "É aceitável que o card mude antes de a pessoa clicar em Salvar edição?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u03-m06/enunciado.md",
      "codigoInicialIds": [
        "u03-m06"
      ],
      "playgroundExemplo": "u03-m06",
      "tipo": "desafio"
    },
    {
      "id": "u03-m07",
      "encontroId": "02",
      "unidadeId": "03",
      "etapa": "opcional",
      "codigo": "T07",
      "titulo": "Quando a tarefa foi criada?",
      "resumo": "Uma lista pode ajudar mais se mostrar quando a tarefa entrou?",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u03-m07/enunciado.md",
      "codigoInicialIds": [
        "u03-m07"
      ],
      "playgroundExemplo": "u03-m07",
      "tipo": "desafio"
    },
    {
      "id": "u03-componentes",
      "encontroId": "02",
      "unidadeId": "03",
      "etapa": "opcional",
      "codigo": "T08",
      "titulo": "Reutilizar sem esconder a lógica",
      "resumo": "Extraia TarefaCard.vue da sua lista. Passe a tarefa por props e emita a intenção de excluir, mantendo a alteração do array no componente pai.",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u03-componentes/enunciado.md",
      "tipo": "desafio"
    },
    {
      "id": "u03-rotas",
      "encontroId": "02",
      "unidadeId": "03",
      "etapa": "opcional",
      "codigo": "T09",
      "titulo": "Duas telas com Vue Router",
      "resumo": "No projeto local, instale vue-router, configure duas rotas (Início e Sobre), navegue por RouterLink e mostre a tela com RouterView. Preserve o núcleo da lista de tarefas.",
      "status": "publicado",
      "origem": "oficial",
      "enunciado": "exercicios/u03-rotas/enunciado.md",
      "tipo": "desafio"
    }
  ],
  "codigos": [
    {
      "id": "u01-m01",
      "encontroId": "01",
      "titulo": "M01 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u01-m01.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u01-m02",
      "encontroId": "01",
      "titulo": "M02 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u01-m02.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u01-m03",
      "encontroId": "01",
      "titulo": "M03 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u01-m03.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u01-m04",
      "encontroId": "01",
      "titulo": "M04 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u01-m04.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u01-m05",
      "encontroId": "01",
      "titulo": "M05 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u01-m05.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u01-m06",
      "encontroId": "01",
      "titulo": "M06 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u01-m06.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u01-m07",
      "encontroId": "01",
      "titulo": "M07 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u01-m07.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u01-m08",
      "encontroId": "01",
      "titulo": "M08 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u01-m08.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u01-m09",
      "encontroId": "01",
      "titulo": "M09 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u01-m09.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u02-m01",
      "encontroId": "01",
      "titulo": "P01 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u02-m01.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u02-m02",
      "encontroId": "01",
      "titulo": "P02 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u02-m02.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u02-m03",
      "encontroId": "01",
      "titulo": "P03 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u02-m03.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u02-m04",
      "encontroId": "01",
      "titulo": "P04 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u02-m04.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u02-m05",
      "encontroId": "01",
      "titulo": "P05 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u02-m05.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u02-m06",
      "encontroId": "01",
      "titulo": "P06 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u02-m06.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u02-m07",
      "encontroId": "01",
      "titulo": "P07 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u02-m07.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u03-m01",
      "encontroId": "02",
      "titulo": "T01 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u03-m01.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u03-m02",
      "encontroId": "02",
      "titulo": "T02 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u03-m02.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u03-m03",
      "encontroId": "02",
      "titulo": "T03 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u03-m03.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u03-m04",
      "encontroId": "02",
      "titulo": "T04 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u03-m04.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u03-m05",
      "encontroId": "02",
      "titulo": "T05 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u03-m05.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u03-m06",
      "encontroId": "02",
      "titulo": "T06 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u03-m06.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "u03-m07",
      "encontroId": "02",
      "titulo": "T07 · App.vue inicial",
      "linguagem": "vue",
      "arquivo": "codigo/missoes/u03-m07.vue",
      "papel": "inicial",
      "status": "publicado",
      "origem": "oficial"
    }
  ],
  "redirecionamentos": {
    "ola-componente": "u01-m01",
    "contador-reativo": "u01-m05",
    "primeiro-commit": "u02-m01",
    "publicar-no-pages": "u03-rotas",
    "lista-de-tarefas": "u03-m01",
    "pizza-vue": "u02-m01",
    "todo-list": "u03-m01",
    "perfil-componentes": "u01-componentes",
    "pizza-watch": "u02-m07",
    "tarefas-componentes": "u03-componentes"
  },
  "desafios": [],
  "questionarios": [
    {
      "id": "diagnostico",
      "tipo": "diagnostico",
      "titulo": "Questionário inicial",
      "descricao": "Conte o que você já conhece antes do minicurso. Disponível desde já.",
      "url": "https://docs.google.com/forms/d/e/1FAIpQLSfOSAgBb0FJFxV_t7f1yoJO06jWPpottdyCn2O1jkrpDQhFQA/viewform?usp=header",
      "status": "publicado",
      "origem": "oficial"
    },
    {
      "id": "final",
      "tipo": "final",
      "titulo": "Questionário de fechamento",
      "descricao": "Depois da aula 2, conte como foi sua experiência.",
      "url": "https://docs.google.com/forms/d/e/1FAIpQLScxKbRuAybXQ_uQx4l4eFm17Xg1otSe-6U6OJGYCp7BDWAvvQ/viewform?usp=header",
      "liberarEm": "2026-11-26",
      "status": "publicado",
      "origem": "oficial"
    }
  ]
}
