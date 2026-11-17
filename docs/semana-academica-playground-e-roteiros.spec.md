---
id: 80de367a-3867-4eca-9627-8a29cf96b3dc
title: Semana acadêmica — playground e roteiros
status: done
---
# Objetivo
Integrar features dos ZIPs devlab(4).zip e devLab(3).zip e adaptar o DevLab aos quatro PDFs recebidos em 16/11/2026, preservando visual e arquitetura.

## Base verificada
Branch feature/semana-academica-playground-roteiros criada de origin/main em 3b0ed27. ZIP 4 adiciona playground, compilador, exemplos e menu. ZIP 3 oferece atividades/desafios, filtro por aula, conclusão manual local e links de exemplos; manter a estrutura atual em vez de seu layout alternativo.

## Implementação autorizada
- Playground App.vue: execução automática/manual, restauração, atalhos, erros e recuperação, CSS isolado, Vue/TypeScript sob demanda. Exemplos recebidos mais Pizza Vue e TodoList.
- Atividades e desafios de programação com filtro por aula, progresso manual local tolerante a armazenamento inválido/indisponível e acesso ao playground. Preservar quiz existente.
- Publicar PDFs originais: teoria aula 1 (2 páginas), projeto Pizza Vue (19), projeto TodoList (23), prática aula 2 (28). Adaptar encontros e exercícios.
- Pizza: prática 90 min, ref/v-model/v-for, quantidade 1–10, computed, estados vazios, confirmação, commit/push e bônus watch.
- TodoList: prevalecem páginas 1–5 da prática sobre apêndice; clone da base, identidade local, layout/Router/Bootstrap, Input/Button, validação, CRUD, cópia na edição, dois commits, troca de origin e envio para conta pessoal.
- Conferir trechos extraídos contra as páginas renderizadas; manter exemplos executáveis sem alterar PDFs. Distinguir adaptações de originais. Não inventar URL da base nem CSS oficial ausente.

## Limites
Preservar datas/rotas/identidade; sem backend, redesign ou publicação em main. Playground de arquivo único não substitui projeto local com múltiplos componentes.

## Aceitação
Build TypeScript/Vite e validação do conteúdo; verificar exemplos, erros/recuperação, CSS, filtros/progresso, PDFs, rotas, desktop e celular. Registrar comandos/resultados. Commit, push e PR para main, sem merge.

## Pendências externas
Repositórios enviados posteriormente pelo usuário; ver atualização de fontes abaixo.

## Fontes recebidas durante a implementação
O usuário enviou os repositórios MathuCardoso/projeto-vuejs-aula1 e MathuCardoso/todolist-vuejs-curso e suas demonstrações Vercel. Consulta de código em 16/11 confirmou Pizza em 9ba8f06 e TodoList em 79c7cd5, ambos com implementação final. O CSS da Pizza está disponível; os links substituem as pendências. Não apresentar a main final como esqueleto vazio. O playground Pizza adapta App.vue e style.css desse repositório; confirmação visual substitui alert na prévia isolada.

## Conferência dos PDFs
PDFKit extraiu texto nativo dos quatro documentos, sem OCR. A inspeção visual da página 13 do projeto Pizza e 18 do projeto TodoList confirmou que a extração havia reordenado linhas; o PDF original traz a ordem correta. Não atribuir falhas do extrator ao roteiro.

## Resultado e validação
Implementados playground com seis exemplos, atividades/desafios por aula, conclusão manual local, PDFs e roteiros atualizados, links dos repositórios/demonstrações e ajustes de largura no celular. O quiz existente foi preservado. Foram reaproveitados componentes, conteúdo e tokens do DevLab.

Em 16/11/2026, `npm ci` instalou 123 pacotes com zero vulnerabilidades reportadas; `npm run build` concluiu TypeScript, validação de conteúdo e Vite com sucesso. Permanece o aviso de chunk do compilador (~810 kB antes de gzip), carregado sob demanda. `git diff --check` não apontou problemas.

`tests/semana-academica.cjs`, executado com Playwright e Chromium locais contra Vite em 127.0.0.1:5178, passou: Pizza (limites, campos, sabores, cálculo e confirmação), CRUD (validação, cópia, exclusão, edição após mudança de índice), seis exemplos, TypeScript/Options API/template, erros e recuperação, isolamento do DOM/CSS, teclado, filtros, progresso após recarregar, armazenamento inválido/bloqueado, quiz, quatro PDFs HTTP 200 e oito telas a 390/1440px sem overflow. Nenhum pageerror no site. Capturas desktop/celular foram inspecionadas.

Limites: playground de arquivo único, sem Router/imports locais, diálogos nativos ou limite de CPU para loops infinitos; dados da prévia são reiniciados a cada execução. Projetos locais completos estão nos links dos ministrantes. Slides/apostilas seguem indisponíveis conforme o material recebido. As demonstrações Vercel foram cadastradas como enviadas pelo usuário; o extrator web não conseguiu acessá-las.

## Correção de compatibilidade do playground
O erro de especificador vue sem mapeamento foi reproduzido no Firefox: o bootstrap começava como módulo antes de instalar seu import map. Convertido somente o bootstrap em script clássico com função async, registrando o mapa antes do primeiro import dinâmico. A suíte tests/semana-academica.cjs passou integralmente em Firefox e Chromium após o ajuste, incluindo seis exemplos, erros/recuperação e isolamento; npm run build e git diff --check aprovados. A validação anterior cobria Chromium e não havia detectado essa incompatibilidade.
