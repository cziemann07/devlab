# Vuati — regras de uso do mascote

Vuati é um quati astronauta em pixel art. Conceitualmente pertence ao DevLab;
nesta edição ("Já Vue.js?") o núcleo luminoso do peito traz um símbolo
inspirado no Vue.js. Em futuros minicursos esse emblema pode ser trocado, mas
o personagem continua o mesmo.

Estas regras valem para o DevLab, a apostila e os slides, para que as três
peças pareçam da mesma família.

## 1. O que nunca muda

- Anatomia de **quati** (focinho alongado, cabeça moderadamente estreita), não
  guaxinim nem tamanduá.
- Capacete espacial com o rosto e o focinho inteiros dentro dele.
- Traje **off-white e grafite**.
- **Cauda longa e anelada**.
- Núcleo luminoso verde no peito com o emblema da edição.
- Pixel art com contornos nítidos.

Não redesenhe, não recolore, não distorça proporções e não substitua o Vuati
por emoji, foto ou ilustração genérica. Não espelhe a pose: o emblema `</>` do
ombro ficaria invertido.

## 2. Poses aprovadas

| Pose | Arquivo | Quando usar |
|---|---|---|
| De frente, mãos na cintura | `vuati-front` | Hero, capa, apresentação, resultado de desafio |
| De perfil | `vuati-side` | Dicas, navegação, exercícios ("olhando" para o conteúdo) |
| Com a bandeira do Brasil | `vuati-brazil` | Abertura, encerramento, dia de encontro, comemoração |
| Versão simplificada | `vuati-mini` | **Pendente.** Cantos de página e slides |

Enquanto `vuati-mini` não existir, use a pose de frente ou de perfil em tamanho
pequeno (variante `-sm` no site). Não crie uma versão simplificada por conta
própria.

## 3. Presença e tamanho

- **Discreto por padrão.** O mascote acompanha o conteúdo e nunca substitui uma
  instrução escrita.
- **Nunca sobre texto, código, diagramas, títulos ou botões.**
- Mantenha uma área livre ao redor de pelo menos 1/4 da altura do personagem.
- Tamanho mínimo: 48 px de altura na tela ou 12 mm impresso. Abaixo disso o
  personagem deixa de ser reconhecível.

### Apostila

- Em **todas as páginas**, no canto inferior externo, perto da paginação, com
  tamanho e posição constantes.
- Páginas de teoria: pose de frente ou de perfil.
- Exercícios e dicas: pose de perfil (olhando para o enunciado).
- Capa e encerramento: versão maior; no encerramento, a pose com bandeira.
- Na impressão, não dependa do brilho verde para legibilidade.

### Slides

- Capa: personagem em destaque.
- Slides de conteúdo: pequeno, sempre no mesmo canto.
- Abertura de seção: tamanho médio.
- Exercícios: pose de perfil.
- Encerramento: pose com bandeira.

### DevLab

- Landing: elemento expressivo do hero, com fala curta ligada ao momento do
  curso.
- Dicas de exercício: pose de perfil, pequena.
- Resultado de desafio: pose de frente; com bandeira quando acerta tudo.
- Fora disso, evite repetir o mascote em toda seção.

## 4. Animação

- Começa com CSS e troca entre poses estáticas: flutuação de poucos pixels,
  pequenos saltos e alternância entre frente e perfil.
- **Movimentos corporais reais (caminhar, acenar, piscar) só com quadros
  desenhados para isso.** Não simule caminhada deslizando uma pose parada.
- Respeite `prefers-reduced-motion`: sem flutuação, saltos ou trocas
  automáticas.
- O mascote deve encantar, não distrair. Nada de animação contínua chamativa
  perto do conteúdo.

## 5. Texto alternativo

- Quando é decorativo (o caso mais comum), esconda o mascote de leitores de
  tela (`alt=""` / `aria-hidden`).
- Quando transmite informação, descreva a informação, não a aparência.
- Falas do mascote são texto comum, legíveis sem a imagem.

## 6. Arquivos

### Estrutura

```text
src/assets/vuati/
  source/vuati-conceito.webp   imagem-conceito aprovada (três poses juntas), como recebida
  static/                      PNG transparente, resolução original, para apostila e slides
    vuati-front.png
    vuati-side.png
    vuati-brazil.png
  optimized/                   WebP usado pelo site (normal e -sm)
  index.ts                     registro das poses usado por VuatiMascot.vue
```

### Origem e tratamento

As poses foram isoladas da imagem-conceito com
`scripts/vuati-isolar-poses.py` (Python 3 + Pillow, fora das dependências do
site). O script **não redesenha** o personagem. Ele:

1. zera o ruído de transparência do arquivo gerado e torna opacos os pixels
   quase opacos;
2. separa as três poses e descarta "poeira" isolada;
3. coloca as três no mesmo canvas (703 × 633), alinhadas pelo centro da sombra,
   para que a troca de pose não desloque o personagem;
4. grava PNG e WebP.

Para regerar os arquivos:

```bash
python3 scripts/vuati-isolar-poses.py src/assets/vuati/source/vuati-conceito.webp src/assets/vuati
```

### Limitações conhecidas

- A imagem-conceito é uma ilustração gerada e ampliada, não um sprite
  pixel-perfect. Por isso o site não usa `image-rendering: pixelated`: a
  redução suave preserva melhor os detalhes nesta fonte.
- As poses vieram de uma única imagem; o recorte mantém a sombra no chão de
  cada pose.

### Pendências (briefing v0.1)

| Asset | Prioridade | Situação |
|---|---|---|
| `vuati-front`, `vuati-side`, `vuati-brazil` | P0 | Isolados da imagem-conceito (provisórios até a arte final) |
| `vuati-mini` | P0 | **Não existe.** Usos pequenos aproveitam a variante `-sm` |
| Arquivo-fonte editável | P0 | Não disponível |
| `idle`, `blink`, `turn`, `wave`, `walk`, `brazil` (quadros) | P1 | Não existem. O site usa CSS + troca de poses |

Quando a arte final chegar, substitua os arquivos mantendo nomes e o canvas
comum (ou rode o script sobre a nova folha), e o site se atualiza sem mudar
código.
