---
id: 80de367a-3867-4eca-9627-8a29cf96b3dc
title: Semana acadêmica — playground e roteiros
status: in_progress
---

## Objetivo

Atualizar a wiki DevLab com o pacote oficial `projeto-vue.zip`, substituindo a trilha anterior por uma sequência coerente de estudo, missões e materiais por encontro. O aluno deve identificar onde começar, o que fazer em seguida e o que é opcional, sem navegar entre versões concorrentes ou encontrar soluções completas antecipadamente.

Esta revisão foi solicitada e definida em entrevista em 17/11/2026. Especifica uma nova etapa, ainda não implementada; os resultados da entrega anterior permanecem identificados no contexto técnico. Após a entrevista e a elaboração da spec, o usuário autorizou a implementação com “mete marcha”. Essa autorização não inclui merge ou publicação automática desta etapa.

## Requisitos

**R1 — Fonte e precedência.** O pacote oficial recebido é a fonte da nova trilha. O roteiro consolidado dos ministrantes, de 16 páginas, orienta horários, núcleo e opcionais dos dois encontros; as apostilas orientam o conteúdo do aluno. As apresentações devem ser coerentes com essa condução. Qualquer divergência material entre fontes novas deve ser apresentada ao responsável antes de alterar requisitos pedagógicos. Os roteiros antigos deixam de orientar a navegação e os textos publicados.

**R2 — Organização por encontro.** Preservar os dois encontros, em 24 e 26/11/2026, das 19h às 22h. Dentro do encontro 01, reunir Unidade 01 (fundamentos/ecossistema) e Unidade 02 (Pizza Vue); dentro do encontro 02, Unidade 03 (To-Do List). A preparação continua como apoio. Três unidades não significam três aulas. A Unidade 01 é material de estudo: a retomada presencial não exige executar suas nove missões inteiras.

Cada encontro apresenta uma ordem de estudo, suas unidades, acesso às apostilas/slides, missões e indicação textual de núcleo, progressão e extras. Usar linguagem do aluno; instruções internas de mediação permanecem com a equipe.

**R3 — Conteúdo canônico e ausência de duplicação.** Adaptar as páginas Markdown do pacote ao pipeline existente, com uma única fonte por unidade/missão e um único cadastro por material. Links em encontro, inventário e catálogo podem apontar para o mesmo item; não criar cópias independentes da mesma atividade. Não importar os READMEs como páginas de aula nem criar uma segunda wiki paralela.

Mapear cada exercício, desafio, código e material atual para uma destas ações: manter por ser complementar, substituir por missão equivalente ou retirar por estar superado. Não manter exercício antigo e missão nova ensinando a mesma etapa como atividades concorrentes. Conteúdos complementares só permanecem quando corretos, úteis e claramente opcionais. Preservar rotas úteis com redirecionamento ou orientação para o sucessor, sem reabrir o conteúdo retirado.

**R4 — Apostilas e missões.** Publicar uma apostila de aluno por unidade: Unidade 01 (17 páginas), Unidade 02 (12 páginas) e Unidade 03 (11 páginas). Aproveitar também o conteúdo em Markdown para estudo na wiki; o PDF é a versão para consulta/download do mesmo material, não um segundo curso.

Integrar as 23 missões principais com código inicial: nove da Unidade 01, sete da Pizza e sete da To-Do. Incluir a missão opcional de componentes da Unidade 01 e os aprofundamentos de componentes/rotas das demais unidades como atividades opcionais de projeto local, sem exigir execução multi-arquivo no playground. Cada missão oferece enunciado, objetivo, instruções, pistas permitidas, critério observável e próximo passo. Preservar investigação, previsão, experimentação e testes entre duplas.

A progressão oficial diferencia: Unidade 01 M01–M04 como núcleo recomendado de estudo e M05–M09 como progressão; Pizza P01–P06 como núcleo e P07 como extra; To-Do T01–T04 como núcleo, T05/Bootstrap como bônus e T06–T07 como aprofundamentos. Componentes e Router são extras. Não converter opcionais em requisitos de conclusão.

**R5 — Playground orientado às missões.** Substituir os exemplos completos de Pizza e To-Do pelos códigos iniciais das missões. Abrir a missão correta pelo link da atividade; mostrar encontro, unidade e missão na seleção, evitando um menu plano e ambíguo de 23 arquivos. Restaurar deve recuperar o código inicial da missão selecionada.

Os códigos iniciais progressivos podem incorporar o aprendizado das etapas anteriores, conforme a apostila. Isso não autoriza publicar as pastas de soluções nem oferecer um botão para carregar o resultado completo da missão atual. Exemplos genéricos existentes só permanecem se não duplicarem a trilha ou anteciparem suas soluções. Links antigos `?exemplo=pizza` e `?exemplo=todo-crud` devem encaminhar para o início correspondente, sem carregar as versões completas antigas.

Manter execução automática/manual, mensagens de erro, recuperação, teclado e isolamento da prévia. SFC com imports de `vue` continua sendo o escopo do playground; terminal, Git, CDN/Bootstrap, múltiplos componentes e Router devem ter instruções explícitas para o laboratório local quando necessários. Não ampliar o executor para comportar os extras.

**R6 — Soluções e materiais da equipe.** Não adicionar ao repositório público ou ao deploy os guias de ministrante, gabaritos, PowerPoints, roteiro operacional interno, roteiro de mediação ou pastas de soluções recebidos. O ZIP completo também não deve ser publicado. Os projetos locais recebidos contêm versões finais: não distribuí-los integralmente ao aluno como código inicial. Disponibilizar somente um ponto de partida apropriado, quando a atividade local precisar dele.

Revisar as resoluções, códigos finais e links para implementações completas que a wiki já oferece; retirar da trilha pública os que revelam as missões substituídas. Referências externas úteis podem permanecer quando não servirem como atalho para a solução completa. Não alterar repositórios externos. Remover arquivos e imports da árvore pública atual, além de links, seletores e metadados. `rascunho`, CSS, autenticação simulada ou um botão escondido não protegem um arquivo versionado em repositório público.

O gabarito do questionário/Kahoot e sua revisão interativa continuam removidos. Os desafios de interpretação e checkpoints novos são atividades de reflexão, sem publicar respostas do guia. Não inventar link de Kahoot ou formulário ainda não recebido.

**R7 — Slides públicos por enquanto, com reversão simples.** Publicar os dois PDFs dos slides: aula 1 com 21 páginas e aula 2 com 23. Os PowerPoints permanecem com a equipe. A publicação dos PDFs é uma decisão provisória explícita do usuário: preservar os originais fora do repositório público e usar cadastros identificáveis que permitam retirar os dois PDFs sem alterar componentes ou remover apostilas/missões.

A reversão deve retirar o acesso e os próprios PDFs dos arquivos publicados, ajustar o estado dos materiais e passar pelo build/CI. Documentar o procedimento no guia de conteúdo existente; não criar sistema de permissões, agendamento ou infraestrutura de flags. Os trechos demonstrativos dos slides são permitidos por esta decisão; se a revisão identificar uma solução completa de missão, consultar o responsável antes de publicar esse arquivo.

**R8 — Retirada das versões antigas.** Remover do catálogo e de `public/` os seis PDFs anteriores superados e os apoios antigos equivalentes, após mapear a cobertura pelas fontes novas. Não criar arquivo histórico público. Atualizar descrições, avisos de “aguardando envio”, referências a páginas antigas e instruções em encontros, exercícios, README e inventário. O histórico Git preserva a recuperação técnica; não reescrever esse histórico nesta etapa.

Na Unidade 01, os dois pares de PDFs têm texto extraído igual, mas arquivos/diagramação diferentes. Publicar apenas uma apostila. A cópia diretamente em `01/Unidade_01_Apostila_Alunos.pdf` apresentou a capa corrigida na inspeção; conferir as páginas antes de escolhê-la. Nenhum guia do ministrante entra nessa seleção pública.

**R9 — Condução atualizada.** Substituir a divisão anterior de teoria de 60 minutos + prática de 90 minutos e a prática de 160 minutos da aula 2 pelos blocos do roteiro consolidado, incluindo pausas e encerramentos. Git prevê dois registros locais por encontro quando viáveis; push e credenciais pessoais não são requisitos. Remover instruções antigas que exijam envio ao GitHub para concluir o núcleo.

Pizza mantém preços 25/35/45, quantidade 1–10 e total por tamanho × quantidade; sabores não alteram preço. Finalização é simulação opcional. To-Do mantém validação com espaços em branco, IDs distintos, listagem, estado vazio, contador e exclusão com confirmar/cancelar. Edição, datas e arquitetura são opcionais. Não prometer persistência, pagamento real, backend ou contas.

**R10 — Identidade e progresso.** Preservar identidade DevLab, mascote, tokens, datas, acessibilidade e comportamento responsivo. Melhorar organização e clareza dentro dessa identidade. Modo claro é uma ideia futura expressa pelo usuário e não faz parte desta entrega; não incluir alternador, paleta nova ou infraestrutura preventiva.

Preservar a conclusão manual local de atividades mantidas. Não transferir uma conclusão antiga para missão nova de conteúdo diferente; identificadores novos precisam ser distintos. A trilha deve funcionar com armazenamento inválido, ausente ou bloqueado, sem transformar o progresso em prova de aprendizagem.

## Critérios de Aceite

- [ ] A partir da página inicial, o aluno encontra os dois encontros e as unidades correspondentes; não há terceiro encontro artificial ou trilhas paralelas concorrentes.
- [ ] O inventário contém exatamente uma apostila por unidade e um PDF de slides por encontro, sem versões antigas, duplicatas ou avisos de envio pendente para esses materiais recebidos.
- [ ] As 23 missões com código inicial estão cadastradas uma vez, corretamente ordenadas e associadas ao encontro/unidade. Opcionais de componentes e Router estão identificados como locais e opcionais.
- [ ] Cada missão abre seu próprio código inicial no playground; restaurar recupera esse início. Abrir dois links de missões em sequência na mesma aba não mantém o arquivo da missão anterior.
- [ ] Os 23 códigos iniciais compilam e exibem a base prevista em Chromium e Firefox, sem exigir que o aluno resolva a missão para abrir a prévia. Eventual erro intencional deve estar explicitamente identificado e validado contra o enunciado.
- [ ] Não há soluções completas das missões atuais em seletores, resoluções, imports, bundle, arquivos públicos, links da trilha ou arquivos novos versionados. Os iniciais progressivos e trechos demonstrativos autorizados são avaliados segundo R5–R7.
- [ ] Os URLs antigos dos exemplos completos não carregam mais suas soluções. O PDF e o quiz do Kahoot continuam indisponíveis.
- [ ] Os seis PDFs antigos foram retirados da publicação; os novos PDFs abrem e podem ser baixados sem 404, com títulos e tipos corretos. O hash routing e o subcaminho `/devlab/` funcionam em abertura direta.
- [ ] Horários, núcleo/opcionais e instruções Git são coerentes entre landing, encontros, missões e materiais novos; não há requisito residual de push ou Router para concluir a aula.
- [ ] A retirada provisória dos PDFs dos slides foi ensaiada sem perder apostilas/missões: PDFs e links saem do resultado publicado, build passa, e a restauração da configuração recompõe a publicação autorizada.
- [ ] Navegação por teclado, nomes acessíveis, foco visível, leitura de textos/código e telas de 390/1440 px funcionam sem overflow horizontal da página. A prévia mantém isolamento e recuperação após erros.
- [ ] Atividades mantidas conservam seu progresso; missões novas não aparecem concluídas por coincidência de IDs; armazenamento bloqueado/inválido não impede estudar.
- [ ] TypeScript, validação de conteúdo, build de produção e testes de navegador pertinentes passam na revisão final. CI do PR está verde no SHA exato que será integrado; nenhuma falha é ignorada para publicar.

## Cuidados e Limites

O repositório e o GitHub Pages são públicos. Não tratar remoção da navegação como controle de acesso. Preservar os materiais reservados em sua fonte original privada/local, sem criar área administrativa ou solução de autenticação nesta entrega. Versões antigas já presentes no histórico não se tornam privadas por serem apagadas da árvore atual.

Preservar os PDFs oficiais escolhidos sem redesign ou edição silenciosa. Problemas de extração devem ser conferidos visualmente antes de atribuir erro ao autor. Adaptações necessárias de Markdown, caminhos e integração devem manter os conceitos e distinguir origem oficial de ajustes técnicos.

Evitar importar a estrutura de pastas inteira ou publicar cada arquivo como um recurso independente. Não instalar as dependências dos projetos recebidos na aplicação DevLab nem copiar seu `package.json` sobre o existente. O trabalho é integrar conteúdo e os pontos de navegação necessários.

Não incluir modo claro, backend, persistência das aplicações de exemplo, cadastro de alunos, ranking, correção automática, suporte multi-arquivo no playground ou reescrita do histórico. Não adicionar um download do pacote completo que reexponha guias e soluções.

A implementação foi autorizada em 17/11/2026. Seguir as regras de branch/worktree do workspace e obter a direção necessária antes de trocar a associação Git. Não implementar sobre a branch já integrada `tigas2909` por conveniência. Preparar commit/PR após validar; merge e publicação desta etapa dependem de autorização posterior.

## Execução e validação

1. Confirmar a base atual da `main`, a autorização para implementar e o contexto Git. Conferir o hash do ZIP e montar um mapa fonte → destino → público/reservado → substituição, antes de copiar materiais. A revisão desta spec substitui as decisões pedagógicas da entrega anterior.
2. Consolidar a navegação por encontro/unidade e o mapeamento dos itens antigos. Reutilizar IDs de material somente quando a identidade permanecer a mesma; usar IDs próprios para missões novas. Registrar redirecionamentos e destinos de links antigos.
3. Integrar apostilas, Markdown e códigos iniciais, depois os PDFs dos slides. Retirar os cadastros/arquivos superados e as implementações finais públicas abrangidas. Atualizar enunciados e cronogramas em conjunto; não deixar uma etapa parcialmente publicada.
4. Executar `npm ci` quando necessário ao ambiente e `npm run build` (checagens TypeScript, validação de conteúdo e Vite), além de `git diff --check`. Testar erros de referências/arquivos e a exclusão de materiais não publicados no pipeline quando esse comportamento for alterado.
5. Servir o build de produção com `npm run preview`. Atualizar `tests/semana-academica.cjs` para a nova trilha, preservando as verificações úteis de isolamento, compilação, teclado e progresso. Testar os 23 iniciais em Chromium e Firefox, links diretos, troca de missão, restaurar, erros/recuperação, PDFs e desktop/celular. Validar os extras nos ambientes locais apropriados, sem mudar o contrato do playground.
6. Inspecionar árvore versionada, `public/`, `dist/`, fontes importadas e links para confirmar ausência de materiais reservados/retirados. Testar URLs antigas: arquivos removidos não devem retornar PDF nem soluções; rotas com substituto devem orientar o aluno.
7. Ensaiar a reversão dos dois PDFs dos slides em estado temporário de teste, validar o resultado e restaurar a opção pública autorizada antes da revisão final. Não transportar os materiais da equipe para o repositório durante o ensaio.
8. Registrar SHA/base, comandos, navegadores e resultados efetivamente medidos, incluindo limitações. Quando a implementação for autorizada, preparar commit/PR revisável; integrar somente com CI verde no head final e com a aprovação aplicável. Após eventual autorização de merge/publicação, conferir deploy e site publicado: catálogo, missões, PDFs, arquivos antigos e ausência de gabaritos.

A elaboração desta spec não comprova a integração dos arquivos recebidos. Os testes da entrega anterior não substituem os testes da nova trilha.

Preparação medida em 17/11/2026, ainda fora da branch do produto: a integração está em `/private/tmp/devlab-official-stage`, com prévia em `http://127.0.0.1:5178/`. O usuário aprovou a prévia e solicitou abrir o PR. A branch `feature/trilha-oficial-unidades` foi criada sobre `origin/main` em `615fc0c`; a árvore da main era idêntica à base de conteúdo usada na preparação.

Na cópia temporária, `npm run build` e `npm run verify:public` passaram. `tests/semana-academica.cjs` passou com Chromium e Firefox: 23 códigos iniciais executados, três unidades/27 atividades, âncoras, aliases, troca de missão, restauração, erros/isolamento, filtros, progresso, cinco PDFs e 12 telas de 390/1440 px sem overflow/pageerror. A mesma suíte passou com Chromium sob `http://127.0.0.1:5179/devlab/`. Amostras visuais foram conferidas em `/private/tmp/devlab-oficiais-qa/`; as unidades foram posicionadas antes do cronograma para facilitar começar. A correção final de plural é apenas texto e o build foi repetido após ela.

O ensaio `/private/tmp/devlab-slides-reversal.py` retirou os dois slides e suas localizações, passou no build com três apostilas e confirmou ausência dos arquivos/links; depois restaurou a configuração autorizada e passou novamente com cinco PDFs. Validação negativa em memória rejeitou unidade duplicada, associação entre encontros errada, apostila inexistente e alias inválido.

A aplicação está preparada por lista de 115 arquivos (30 remoções) em `/private/tmp/devlab-official-apply-manifest.json`, com hashes antes/depois. `/private/tmp/devlab-apply-official.py` verifica todos os hashes antes de aplicar; a lista foi aplicada após conferir a base e autorizar a branch. Na árvore real, `npm run build`, `npm run verify:public` e `git diff --check` passaram. `tests/semana-academica.cjs` passou novamente, integralmente, em Chromium e Firefox contra `npm run preview` da branch real, cobrindo os 23 iniciais e os fluxos descritos acima. Commit/PR e CI remoto são as próximas verificações; merge e publicação ficam com o usuário.


## Contexto técnico para implementação

**Fontes verificadas em 17/11/2026.** ZIP em `/Users/carlosziemann/Downloads/projeto-vue.zip`, SHA-256 `ee27cd30c7c4e8b402676b39897033642c008d4b41cffbbaaadd19ec0b6191ff`. Extraído para `/private/tmp/devlab-roteiro-oficial-4ze9j1r9/projeto-vue/`; esse caminho temporário pode desaparecer. A fonte recuperável é o ZIP original, não os arquivos temporários de inspeção.

| Fonte no ZIP | Uso previsto |
| --- | --- |
| `01/Unidade_01_Apostila_Alunos.pdf` | Apostila pública de fundamentos, após conferência visual |
| `01/Unidade_01_Vue_Material_Completo/` | Markdown, páginas de wiki e nove iniciais; guias/soluções reservados |
| `02/unidade-02-pizza-vue/` | Apostila, Markdown e sete iniciais de Pizza; guia, soluções e projeto final reservados |
| `03/unidade-03-todo-list/` | Apostila, Markdown e sete iniciais de To-Do; guia, soluções e projeto final reservados |
| `Apresentacoes_Completas_Ja_Vuejs/Aula_01_Pizza_Vue.pdf` e `Aula_02_ToDo_List.pdf` | Dois PDFs públicos provisoriamente; `.pptx` e mediação reservados |
| `roteiro-definitivo-completo-real-oficial-cabine-dupla-twist-carpado.pdf` | Referência interna de condução; não publicar |

Foram encontrados 12 PDFs no ZIP, incluindo dois pares de versões da Unidade 01 com texto extraído idêntico. Há 39 arquivos Markdown em pastas `wiki/`, dos quais três são READMEs; não transformar esse número em obrigação de criar 39 páginas. Foram extraídos textos nativos com PDFKit, sem páginas classificadas pela inspeção simples como sem texto relevante; amostras renderizadas confirmaram a evolução gráfica e o problema de capa da cópia aninhada. Os projetos novos ainda não foram executados nem validados no DevLab.

**Arquitetura existente.** Vue 3, TypeScript estrito, Vite e Vue Router com hash; conteúdo em `content/`, pipeline Markdown/Shiki no build e site estático publicado no GitHub Pages. Não há modelo de unidade no contrato atual: acrescentar a relação mínima necessária de unidade/ordem/categoria, reutilizando encontro, exercício, material e código existentes. Manter uma única fonte dessas associações para evitar divergência entre catálogo, inventário e playground.

| Área | Arquivos principais |
| --- | --- |
| Cadastro e textos | `content/index.ts`, `content/cursos/vue-github/index.ts`, `encontros/`, `exercicios/` e `codigo/` dentro do curso |
| Contratos e consultas | `src/types/content.ts`, `src/content/index.ts` |
| Pipeline | `build/content/validate.ts`, `availability.ts`, `render.ts`, `plugin.ts` |
| Playground | `src/content/playground-examples.ts`, `src/views/PlaygroundView.vue`, `src/utils/vue-playground.ts`, `src/utils/playground-preview.ts` |
| Navegação e apresentação | `src/router.ts`, `src/views/CourseLanding.vue`, `EncounterView.vue`, `ExerciseView.vue`, `PracticeView.vue`, `src/components/InventoryDialog.vue` |
| Progresso | `src/composables/useProgress.ts`: chave `devlab-progress-v1`, entradas por curso + ID de exercício |
| Arquivos públicos | `public/materiais/vue-github/oficiais/` e `recebidos/`; arquivos em `public/` são copiados ao deploy mesmo sem link |
| Validação e publicação | `tests/semana-academica.cjs`, `.github/workflows/ci.yml`, `.github/workflows/deploy.yml` |

O campo `localizacao.arquivo` exige arquivo relativo a `public/`; URL externa usa `localizacao.url`. `rascunho`/`em_breve` controlam conteúdo do bundle pelo pipeline, mas não tornam fontes versionadas ou arquivos em `public/` privados. Os exemplos do playground também usam imports `?raw`, portanto retirar apenas o cadastro de material não retira automaticamente seu código do bundle.

**Histórico da etapa anterior.** A implementação inicial de playground/roteiros foi entregue em `7530412`; a compatibilidade do import map no Firefox chegou à main pelo PR #5. O PR #8 preservou os commits de `tigas2909`, retirou PDF/quiz do Kahoot com correção `4b701ef` e foi integrado em `615fc0c`. Essa remoção deve permanecer. Os testes Chromium e o deploy dessa correção passaram; isso não valida os materiais agora recebidos. As decisões anteriores de preservar o quiz e exigir push/Router na trilha foram superadas pelas instruções posteriores do usuário e por esta revisão.
