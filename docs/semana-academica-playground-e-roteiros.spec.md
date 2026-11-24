---
id: 80de367a-3867-4eca-9627-8a29cf96b3dc
title: Semana acadêmica — playground e roteiros
status: in_progress
---

## Objetivo

Simplificar a wiki em torno de Preparação, Aula 01 e Aula 02, preservando a home e o playground. O usuário relatou excesso de conteúdo, dificuldade de distinguir encontro de unidade e necessidade de orientar o aluno sem uma nova camada de navegação.

Esta revisão substitui a apresentação por unidades aprovada na etapa anterior. A equipe ainda está fechando a condução das aulas; a instrução atual do usuário prevalece sobre os horários e obrigatoriedades dos roteiros anteriores.

## Requisitos

- Preservar layout, identidade, preparação e cronograma da home. Não implementar modo claro nesta etapa.
- Transformar Cronograma do cabeçalho em dropdown com Preparação, Aula 01 e Aula 02. A troca de aula acontece por esse menu ou pela home, sem barra lateral ou navegação anterior/próxima dentro da aula.
- Manter o Inventário acessível pelo cabeçalho, inclusive no celular. Materiais são os mesmos cadastros usados nas aulas, sem cópias independentes.
- Cada aula apresenta sumário e conteúdo adaptado para leitura na web: explicações, exemplos e etapas organizados. O objetivo não é despejar o PDF inteiro nem substituir a apostila por um resumo superficial. Slides e eventual PDF são apoio complementar. Enquanto as apostilas finais não chegam, os conceitos atuais são explicitamente provisórios.
- Aula 01: teoria de Vue, relação com HTML/CSS/JS, breve história, teoria de Git e prática Pizza com a base indicada pela equipe. Não afirmar que os iniciais dos exercícios são a base oficial da prática: a escolha ainda não foi confirmada.
- Incluir nos materiais da aula 2 e no Inventário o repositório base enviado por Felipe: https://github.com/MathuCardoso/todolist-vuejs-base. Registro único `codigo-base-todo`; não confundir com o repositório anterior que já contém o projeto completo.
- Aula 02: desenvolver a To-Do List e enviar o projeto ao GitHub no final. Não confundir envio ao repositório com hospedagem do site. Não manter instruções que neguem essa etapa de envio na página da aula/preparação.
- Não apresentar cronogramas minuciosos ou uma dinâmica de duplas como compromissos já fechados. A equipe ainda definirá a sequência detalhada.
- Retirar as páginas extensas de unidade do caminho do aluno. URLs antigas de unidades redirecionam para a aula correspondente. Metadados internos podem continuar agrupando os exercícios, sem uma segunda camada pedagógica visível.
- Preservar integralmente os 23 códigos iniciais e os 27 exercícios existentes, IDs/progresso e capacidades do playground. A redução de exercícios foi adiada pelo usuário; eles permanecem apoio opcional, sem obrigar o aluno a percorrer todos para acompanhar a aula.
- As duas apostilas finais, ainda a serem enviadas pela equipe, são fontes para adaptar o conteúdo diretamente em `encontros/01` e `encontros/02`. A jornada principal é leitura na wiki: sumário, conceitos, exemplos e etapas organizados. PDF pode ser consulta complementar; não juntar os arquivos antigos nem gerar uma nova apostila sem solicitação. Não considerar a adaptação final concluída antes de receber essas fontes.
- Questionário inicial publicado agora e sem limite de data: `https://docs.google.com/forms/d/e/1FAIpQLSfOSAgBb0FJFxV_t7f1yoJO06jWPpottdyCn2O1jkrpDQhFQA/viewform`.
- Questionário de fechamento visível na wiki a partir do segundo dia, 26/11/2026, no fuso America/Sao_Paulo: `https://docs.google.com/forms/d/e/1FAIpQLScxKbRuAybXQ_uQx4l4eFm17Xg1otSe-6U6OJGYCp7BDWAvvQ/viewform`. Foi explicitada a interpretação de liberação pelo dia civil, sem horário adicional. Simular a data da landing não antecipa esse link. O inicial continua acessível depois das aulas.

## Critérios de Aceite

- Home preservada, com questionário inicial acessível agora. O fechamento não aparece antes de 26/11 em nenhum ponto de entrada da wiki, inclusive com simulação da landing para datas futuras; aparece a partir de 26/11 no fuso do curso.
- Cronograma do cabeçalho abre as três etapas e funciona por teclado, Escape, clique externo e em celular. Inventário permanece alcançável sem rolar a navegação horizontal.
- Aulas apresentam sumário e conteúdo adaptado das respectivas apostilas finais, com slides e eventual PDF como apoio. Não há barra lateral, links anterior/próxima ou páginas de unidade obrigatórias na jornada. Enquanto as fontes não chegam, a interface identifica que os textos atuais são apoio provisório.
- URLs anteriores de unidade continuam úteis, levando aos conceitos da aula certa.
- Inventário e materiais das aulas apontam para os mesmos arquivos. Não há versões concorrentes ou duplicatas.
- Todos os 23 arquivos Vue iniciais são idênticos aos da entrega f168297; exercícios e progresso não são apagados. Seletor do playground mantém os grupos e os links de missão funcionam.
- Envio do To-Do ao GitHub aparece como fechamento da aula 2, sem prometer que essa etapa já foi detalhada pela equipe ou que a base da Pizza foi confirmada.
- Build, checagem de conteúdo, regressão dos fluxos alterados, datas-limite e telas de 390/1440 px aprovados antes do PR. CI verde no head final antes de qualquer merge.

## Cuidados e Limites

Não alterar os formulários Google nem enviar respostas. A liberação descrita é a exibição do link na wiki; ela não cria restrição de acesso no serviço externo. O DevLab não coleta as respostas.

Preservar as fontes e atribuições ao adaptar o conteúdo para a wiki. Não criar ou unir PDFs nesta etapa; downloads podem ser apoio opcional. Guias, soluções completas, PowerPoints e pacote ZIP continuam reservados à equipe. O gabarito do Kahoot continua removido.

Não reduzir ou apagar códigos do playground. Não reintroduzir carga obrigatória de 27 atividades. Não acrescentar backend, autenticação, sistema de permissões ou modo claro.

A dispensa temporária de aprovação dada ao PR #9 foi pontual, já encerrada com a regra restaurada; não reutilizá-la para esta revisão sem nova autorização.

## Execução e validação

1. Atualizar páginas e navegação, reutilizando os cadastros existentes. Não copiar enunciados inteiros para as páginas das aulas.
2. Cadastrar os dois links e aplicar uma única regra de liberação por data em todos os pontos em que questionários são exibidos. Validar 25/11 às 23:59:59 e 26/11 às 00:00 em São Paulo e o comportamento da simulação de datas.
3. Quando as duas apostilas finais chegarem, conferir texto e páginas renderizadas, adaptar o conteúdo para leitura nas duas páginas de aula, revisar a sequência pedagógica com as fontes e manter os códigos iniciais. Não substituir essa adaptação por uma junção de PDFs.
4. Executar build e verificações de publicação; testar dropdown, sumário, aliases, questionários e playground em Chromium/Firefox, desktop/celular.
5. Comparar hashes dos 23 arquivos com f168297. Registrar limites e resultados medidos. Preparar PR revisável, sem merge/publicação automática.

## Contexto técnico para implementação

Base de conteúdo: f168297, integrado pelo PR #9 em 4b9013b. A spec anterior e seu histórico permanecem nos commits e outputs do Kavor. A branch atual é feature/trilha-oficial-unidades; nenhuma troca de branch foi feita para esta revisão.

Conteúdo do curso em content/cursos/vue-github/index.ts; páginas curtas em encontros/*.md. Unidades podem permanecer como metadados de organização do seletor, mas não precisam renderizar seus textos longos no bundle público. O pipeline está em build/content; recursos compartilhados são apresentados por ResourceList e InventoryDialog.

A lógica de data usa America/Sao_Paulo em src/utils/date.ts. A simulação da landing em useCourseMoment não deve determinar a liberação dos formulários; a data real precisa ser usada para isso. A seleção de questões e suas respostas não pertence ao DevLab.

Os dois links dos Forms responderam HTTP 200 em navegador sem sessão autenticada. Os títulos observados foram Questionário Diagnóstico (Pré-Minicurso) e AVALIAÇÃO FINAL. O Google oferece login para salvar preenchimento; não foi feito login nem enviada resposta. A origem de Vue/Evan You/2014 foi conferida na FAQ oficial: https://vuejs.org/about/faq.html.

Em 23/11/2026, o usuário confirmou que as duas apostilas finais ainda serão enviadas; devem ser adaptadas em encontros/01 e encontros/02, não reunidas em PDFs. Preservam-se todas as críticas de simplificação e os 23 códigos do playground. A etapa independente atual reúne navegação, questionários, preparação e a base da To-Do. A adaptação integral das aulas permanece pendente das fontes finais.

A base da To-Do foi inspecionada no commit 837dafbde58ba3935a48aff76c24ce8d84fccb69: App.vue com formulário e lista estáticos, script vazio e README com npm install/dev/build. O package.json exige Node ^22.18.0 || >=24.12.0. A página de preparação deve explicar a verificação/instalação de Node/npm/Git, VS Code, conta GitHub, clone e execução local sem executar instalações no computador do usuário.

Validação local em 23/11/2026: npm run build e npm run verify:public passaram; os 23 iniciais foram comparados byte a byte com f168297 e permanecem iguais. tests/semana-academica.cjs passou em Chromium e Firefox contra a prévia em 127.0.0.1:5180, incluindo links da base, dropdown, aliases, liberação dos Forms em 26/11 São Paulo, simulação sem antecipação, execução dos 23 iniciais, recuperação/isolamento, progresso e 12 telas de 390/1440 px sem overflow/pageerror. A adaptação das apostilas não está incluída nessa prova: as fontes finais continuam pendentes.
