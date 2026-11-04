"""Isola as poses do Vuati a partir da imagem-conceito aprovada.

Uso (requer Python 3 + Pillow; não é dependência do site):
    python3 scripts/vuati-isolar-poses.py src/assets/vuati/source/vuati-conceito.webp src/assets/vuati

O script NÃO redesenha o personagem. Ele apenas:
1. zera pixels quase transparentes (ruído do arquivo gerado) e torna opacos
   os pixels quase opacos;
2. separa as três poses (componentes conexos), descartando poeira < 120 px;
3. alinha todas as poses no mesmo canvas, pelo centro da sombra no chão,
   para que a troca de pose não faça o personagem "pular";
4. grava PNG (static/) e WebP (optimized/, normal e -sm).
"""
import sys
from PIL import Image
from collections import deque
src, outdir = sys.argv[1], sys.argv[2]
import os
os.makedirs(f'{outdir}/static', exist_ok=True); os.makedirs(f'{outdir}/optimized', exist_ok=True)
im = Image.open(src).convert('RGBA')
W, H = im.size
px = im.load()
# 1) limpa ruído de alfa: quase invisível -> 0; quase opaco -> 255
for y in range(H):
    for x in range(W):
        r,g,b,a = px[x,y]
        if a < 24: px[x,y] = (0,0,0,0)
        elif a >= 240: px[x,y] = (r,g,b,255)
# 2) componentes conexos (8-vizinhança) sobre alfa>0
seen = bytearray(W*H)
comps = []
for y in range(H):
    for x in range(W):
        i = y*W+x
        if seen[i] or px[x,y][3] == 0: continue
        q = deque([(x,y)]); seen[i]=1; pts=[]
        while q:
            cx,cy = q.popleft(); pts.append((cx,cy))
            for dx in (-1,0,1):
                for dy in (-1,0,1):
                    nx,ny = cx+dx, cy+dy
                    if 0<=nx<W and 0<=ny<H:
                        j = ny*W+nx
                        if not seen[j] and px[nx,ny][3] > 0:
                            seen[j]=1; q.append((nx,ny))
        comps.append(pts)
comps.sort(key=len, reverse=True)
print('componentes:', len(comps), 'maiores:', [len(c) for c in comps[:8]])
bodies = comps[:3]
def bbox(pts):
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    return min(xs),min(ys),max(xs),max(ys)
bodies.sort(key=lambda c: bbox(c)[0])
bb = [bbox(c) for c in bodies]
print('corpos:', bb)
# 3) componentes menores: mantém os com >=120 px (ex.: marcas verdes), associados ao corpo mais próximo; descarta poeira
groups = [list(c) for c in bodies]
for c in comps[3:]:
    if len(c) < 120: continue
    x0,y0,x1,y1 = bbox(c); cx=(x0+x1)/2; cy=(y0+y1)/2
    def dist(b):
        dx = max(b[0]-cx, 0, cx-b[2]); dy = max(b[1]-cy, 0, cy-b[3]); return dx+dy
    k = min(range(3), key=lambda i: dist(bb[i]))
    print('  extra', len(c), (x0,y0,x1,y1), '-> pose', k, 'dist', round(dist(bb[k])))
    groups[k].extend(c)
# 4) âncora: centro da sombra (linhas inferiores de cada pose)
names = ['front','side','brazil']
info=[]
for k,g in enumerate(groups):
    x0,y0,x1,y1 = bbox(g)
    bottom=[p for p in g if p[1] >= y1-6]
    ax = round(sum(p[0] for p in bottom)/len(bottom))
    info.append((x0,y0,x1,y1,ax))
print('info', info)
left = max(ax-x0 for x0,y0,x1,y1,ax in info)
right = max(x1-ax for x0,y0,x1,y1,ax in info)
up = max(y1-y0 for x0,y0,x1,y1,ax in info)
pad = 8
CW, CH = left+right+1+2*pad, up+1+2*pad
print('canvas', CW, CH, 'anchor x', left+pad)
for k,g in enumerate(groups):
    x0,y0,x1,y1,ax = info[k]
    out = Image.new('RGBA',(CW,CH),(0,0,0,0)); op = out.load()
    ox = left+pad-ax; oy = CH-pad-1-y1
    for (x,y) in g: op[x+ox,y+oy] = px[x,y]
    out.save(f'{outdir}/static/vuati-{names[k]}.png', optimize=True)
    out.save(f'{outdir}/optimized/vuati-{names[k]}.webp', 'WEBP', quality=86, method=6)
    small = out.resize((out.width * 176 // out.height, 176), Image.LANCZOS)
    small.save(f'{outdir}/optimized/vuati-{names[k]}-sm.webp', 'WEBP', quality=88, method=6)
