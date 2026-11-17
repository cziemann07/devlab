// Contra o build de produção: TEST_BASE_URL, PLAYWRIGHT_MODULE e CHROMIUM_PATH são opcionais.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const playwright = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:5178/'
const root = path.resolve(__dirname,'..')
async function main() {
 const browser=await playwright[process.env.TEST_BROWSER || 'chromium'].launch({headless:true,...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH}:{})})
 const context=await browser.newContext({viewport:{width:1440,height:1000}})
 const page=await context.newPage()
 const errors=[]
 page.on('pageerror',error=>errors.push(error.message))
 const ready=()=>page.waitForFunction(()=>document.querySelector('.status-dot')?.getAttribute('data-state')==='ok')
 const failed=()=>page.waitForFunction(()=>document.querySelector('.status-dot')?.getAttribute('data-state')==='error')
 const frame=()=>page.frameLocator('iframe[title="Prévia do componente Vue"]')
 const editor=()=>page.getByRole('textbox',{name:'Código do componente App.vue'})
 let visit=0
 const go=async route=>{await page.goto(base+'?qa='+ ++visit +'#/'+route);await page.locator('h1').first().waitFor()}
 try {
  await go('aula/1')
  assert.equal(await page.locator('.unit-card').count(),2)
  await go('aula/2')
  assert.equal(await page.locator('.unit-card').count(),1)
  for(const [id,count] of [['01',10],['02',8],['03',9]]) {
   await go(`cursos/vue-github/unidades/${id}`)
   assert.equal(await page.locator('.mission-list > li').count(),count)
   const links=await page.locator('.mission-list a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')))
   assert.equal(new Set(links).size,count)
  }
  await page.getByRole('link',{name:'Ler material de estudo',exact:true}).click()
  await page.waitForURL(/#estudo$/)
  assert.equal(await page.locator('.mission-list > li').count(),9)
  console.log('PASS encontros: 3 unidades, 27 atividades canônicas e âncoras sem quebrar o hash routing')
  await go('playground')
  await ready()
  const menu=page.getByLabel('Exemplo',{exact:true})
  const ids=await menu.locator('option').evaluateAll(nodes=>nodes.map(node=>node.value))
  assert.equal(ids.length,23)
  assert.equal(await menu.locator('optgroup').count(),3)
  for(const id of ids) {
   await menu.selectOption(id)
   await page.getByRole('button',{name:/Executar/}).click()
   await ready()
   const expected=fs.readFileSync(path.join(root,`content/cursos/vue-github/codigo/missoes/${id}.vue`),'utf8')
   assert.equal(await editor().inputValue(),expected)
   assert(await frame().locator('body').innerText())
   console.log('PASS inicial',id)
  }
  await editor().fill('<template><p>alterado</p></template>')
  await page.getByRole('button',{name:'Restaurar exemplo'}).click()
  await page.getByRole('button',{name:/Executar/}).click()
  await ready()
  assert.equal(await editor().inputValue(),fs.readFileSync(path.join(root,'content/cursos/vue-github/codigo/missoes/u03-m07.vue'),'utf8'))
  // Troca de missão pela rota sem remontar a página.
  await page.evaluate(()=>{location.hash='/playground?exemplo=u01-m01'})
  await page.waitForFunction(()=>document.querySelector('select[aria-label="Exemplo"]').value==='u01-m01')
  await page.getByRole('button',{name:/Executar/}).click()
  await ready()
  assert.equal(await editor().inputValue(),fs.readFileSync(path.join(root,'content/cursos/vue-github/codigo/missoes/u01-m01.vue'),'utf8'))
  for(const [old,target] of [['pizza','u02-m01'],['todo-crud','u03-m01']]) {
   await go('playground?exemplo='+old);await ready();assert.equal(await menu.inputValue(),target)
  }
  async function run(code) {await editor().fill(code);await page.getByRole('button',{name:/Executar/}).click()}
  await run('<script setup>const x = </script><template><p>x</p></template>');await failed()
  await run('<script setup>import x from "./Outro.vue"</script><template><p>x</p></template>');await failed()
  await run('<script setup>const x = parent.document.title</script><template><p>{{ x }}</p></template>');await failed()
  await run('<script setup lang="ts">import { ref } from "vue"; const n = ref<number>(2)</script><template><button @click="n++">{{ n }}</button></template>')
  await ready();await frame().getByRole('button',{name:'2',exact:true}).click();await frame().getByRole('button',{name:'3',exact:true}).waitFor()
  await editor().focus();await page.keyboard.press('Escape');await page.keyboard.press('Tab')
  assert.equal(await editor().evaluate(el=>el===document.activeElement),false)
  console.log('PASS playground: restauração, rotas/aliases, TS, erros/recuperação, isolamento e teclado')
  await go('atividades');await page.getByLabel('Filtrar por aula',{exact:true}).selectOption('02')
  assert.equal(await page.locator('.mission-list > li').count(),4)
  await go('cursos/vue-github/exercicios/u03-m01')
  await page.getByRole('button',{name:'Marcar como concluído'}).click();await page.reload()
  await page.getByRole('button',{name:'Marcar como pendente'}).waitFor()
  await go('cursos/vue-github/exercicios/u03-m02');await page.getByRole('button',{name:'Marcar como concluído'}).waitFor()
  await go('cursos/vue-github/exercicios/pizza-vue');assert(page.url().endsWith('/u02-m01'))
  await go('desafios');assert.equal(await page.locator('.mission-list > li').count(),8)
  await go('cursos/vue-github/desafios/pizza-vue-git-oficial');await page.getByRole('heading',{name:'Página não encontrada'}).waitFor()
  for(const file of ['apostila-unidade-01.pdf','apostila-unidade-02.pdf','apostila-unidade-03.pdf','slides-aula-01.pdf','slides-aula-02.pdf']) {
   const response=await page.request.get(base+'materiais/vue-github/oficiais/'+file)
   assert.equal(response.status(),200);assert.equal((await response.body()).subarray(0,4).toString(),'%PDF')
  }
  for(const file of ['kahoot-pizza-vue-git.pdf','projeto-aula-01.pdf','projeto-aula-02.pdf','pratica-aula-02.pdf','plano-aula-02.pdf','roteiro-aula-01-teoria.pdf','roteiro-aula-01-pratica.pdf']) {
   const response=await page.request.get(base+'materiais/vue-github/oficiais/'+file)
   assert.notEqual((await response.body()).subarray(0,4).toString(),'%PDF')
  }
  await go('');await page.getByRole('button',{name:'Abrir inventário de materiais'}).click()
  assert.equal(await page.getByRole('dialog').locator('.inventory-card').count(),5)
  assert.doesNotMatch(await page.getByRole('dialog').innerText(),/gabarito|guia do ministrante|aguardando|em breve/i)
  await page.getByRole('button',{name:'Fechar inventário',exact:true}).click()
  await page.evaluate(()=>localStorage.setItem('devlab-progress-v1','{broken'))
  await page.reload();await go('atividades')
  const blocked=await browser.newContext()
  await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}}))
  const blockedPage=await blocked.newPage();await blockedPage.goto(base+'#/cursos/vue-github/exercicios/u03-m01')
  await blockedPage.getByRole('button',{name:'Marcar como concluído'}).click();await blockedPage.getByRole('button',{name:'Marcar como pendente'}).waitFor()
  await blocked.close()
  console.log('PASS catálogo/progresso: filtros, aliases, IDs novos, reload, armazenamento inválido/bloqueado e cinco PDFs')
  for(const width of [1440,390]) {
   await page.setViewportSize({width,height:900})
   for(const route of ['', 'aula/1','cursos/vue-github/unidades/02','cursos/vue-github/exercicios/u02-m01','atividades','playground?exemplo=u03-m01']) {
    await go(route);if(route.startsWith('playground'))await ready()
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow ${width} ${route}`)
    if(process.env.SCREENSHOT_DIR) await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,`${width}-${route.replace(/[^a-z0-9]/gi,'-')||'home'}.png`)})
   }
  }
  assert.deepEqual(errors,[])
  console.log('PASS desktop/mobile: 12 telas sem overflow ou pageerror')
 } finally {await browser.close()}
}
main().catch(error=>{console.error(error);process.exitCode=1})
