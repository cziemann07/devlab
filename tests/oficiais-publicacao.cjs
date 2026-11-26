const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const root = path.resolve(__dirname, '..')
const walk = dir => fs.existsSync(dir) ? fs.readdirSync(dir, {withFileTypes:true}).flatMap(item => item.isDirectory() ? walk(path.join(dir,item.name)) : [path.join(dir,item.name)]) : []
const expected = ['apostila-aula-01.pdf','apostila-aula-02.pdf',...(process.argv.includes('--sem-slides') ? [] : ['slides-aula-01.pdf','slides-aula-02.pdf'])]
const pdfs = walk(path.join(root,'public/materiais/vue-github')).filter(file=>file.endsWith('.pdf')).map(file=>path.basename(file)).sort()
assert.deepEqual(pdfs,expected.slice().sort(),'Somente os PDFs autorizados são públicos')
for(const file of walk(path.join(root,'public/materiais/vue-github'))) {
 assert(!/Guia_Ministrante|solucoes|soluções|\.pptx$|kahoot|roteiro-definitivo|Mediacao/.test(file),'Material reservado na publicação: '+file)
}
const code = walk(path.join(root,'content/cursos/vue-github/codigo'))
assert.equal(code.length,23,'Somente os 23 códigos iniciais oficiais são versionados nesta trilha')
assert(code.every(file=>/missoes\/u0[123]-m\d\d\.vue$/.test(file)))
const bundleFiles = walk(path.join(root,'dist')).filter(file=>/\.(js|html|md)$/.test(file))
for(const file of bundleFiles) {
 const text=fs.readFileSync(file,'utf8')
 for(const forbidden of ['kahoot-pizza-vue-git.pdf','pizza-vue-git-oficial','Guia_Ministrante','playground/solucoes/']) assert(!text.includes(forbidden),`${forbidden} em ${file}`)
}
console.log(`PASS publicação: ${expected.length} PDFs permitidos, 23 iniciais e nenhum material reservado no deploy`)
