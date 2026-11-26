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
  for (const id of ['1','2']) {
   await go('aula/'+id)
   assert.equal(await page.locator('.lesson-summary').count(),1)
   const headings = await page.locator('#conceitos h2').allTextContents()
   const contents = await page.locator('.lesson-summary a').allTextContents()
   for (const heading of headings) assert(contents.includes(heading))
   for (const href of await page.locator('.lesson-summary a').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
    assert.equal(await page.locator('[id="'+href.split('#').pop()+'"]').count(),1)
   }
   assert.equal(await page.locator('.stages, .pager, .unit-card').count(),0)
   await page.getByRole('link',{name:'Materiais da aula',exact:true}).click()
   await page.waitForURL(/#materiais$/)
  }
  await go('aula/1')
  await page.getByRole('link',{name:'Demonstração interativa',exact:true}).click()
  await page.waitForURL(/#demonstracao$/)
  const demo = page.getByRole('region',{name:'Experimente o resumo do pedido'})
  await demo.getByLabel('Nome',{exact:true}).fill('Ana')
  assert.match(await demo.innerText(), /Cliente: Ana/)
  const increase = demo.getByRole('button',{name:'Aumentar quantidade'})
  await increase.click()
  await increase.click()
  assert.match(await demo.getByLabel('Total do pedido').innerText(), /135,00/)
  await demo.getByLabel('Tamanho').selectOption('m')
  assert.match(await demo.getByLabel('Total do pedido').innerText(), /105,00/)
  for(const [id,lesson] of [['01','01'],['02','01'],['03','02']]) {
   await go('cursos/vue-github/unidades/'+id)
   assert(page.url().includes('/encontros/'+lesson))
  }
  await page.locator('.site-header').getByRole('button',{name:'Cronograma',exact:true}).click()
  const schedule=page.getByRole('navigation',{name:'Etapas do minicurso'})
  assert.deepEqual(await schedule.getByRole('link').evaluateAll(links => links.map(link => link.querySelector('span:nth-child(2)').textContent.trim())),['Preparação','Aula 01','Aula 02'])
  const buttonBox = await page.getByRole('button',{name:'Cronograma',exact:true}).boundingBox()
  const menuBox = await schedule.boundingBox()
  assert(Math.abs(buttonBox.x - menuBox.x) < 2)
  assert(menuBox.y >= buttonBox.y + buttonBox.height)
  assert.equal(await page.locator('.site-header').getByRole('link',{name:'Opcionais',exact:true}).count(),0)
  await page.keyboard.press('Escape');assert.equal(await schedule.count(),0)
  console.log('PASS aulas: páginas curtas, sumário, aliases de unidades e dropdown do cronograma')
  await go('aula/2')
  const baseLink=page.getByRole('link',{name:/Abrir Código base · To-Do List/})
  assert.equal(await baseLink.getAttribute('href'),'https://github.com/MathuCardoso/todolist-vuejs-base')
  assert.match(await page.locator('#conceitos').innerText(), /npm create vue@latest todo-projeto/)
  for(const [at,visible] of [['2026-11-26T02:59:59Z',false],['2026-11-26T03:00:00Z',true]]) {
   const dated=await context.newPage()
   await dated.clock.setFixedTime(new Date(at))
   await dated.goto(base+'?data-test='+encodeURIComponent(at)+'#/')
   await dated.locator('h1').first().waitFor()
   assert.equal(await dated.locator('a[href="https://docs.google.com/forms/d/e/1FAIpQLSfOSAgBb0FJFxV_t7f1yoJO06jWPpottdyCn2O1jkrpDQhFQA/viewform?usp=header"]').count()>0,true)
   const closing=()=>dated.locator('a[href="https://docs.google.com/forms/d/e/1FAIpQLScxKbRuAybXQ_uQx4l4eFm17Xg1otSe-6U6OJGYCp7BDWAvvQ/viewform?usp=header"]')
   assert.equal(await closing().count()>0,visible)
   await dated.goto(base+'?data-test='+encodeURIComponent(at)+'#/cursos/vue-github/encontros/02')
   await dated.locator('h1').first().waitFor();assert.equal(await closing().count()>0,visible)
   if(!visible) {
    await dated.goto(base+'?data-test='+encodeURIComponent(at)+'#/?simular=2026-11-28')
    await dated.locator('h1').first().waitFor();assert.equal(await closing().count(),0)
   }
   await dated.close()
  }
  console.log('PASS questionários: inicial sem data; final liberado em 26/11 São Paulo; simulação não antecipa link')

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
  assert.equal(await page.locator('.mission-list > li').count(),9)
  await go('cursos/vue-github/exercicios/u03-m01')
  await page.getByRole('button',{name:'Marcar como concluído'}).click();await page.reload()
  await page.getByRole('button',{name:'Marcar como pendente'}).waitFor()
  await go('cursos/vue-github/exercicios/u03-m02');await page.getByRole('button',{name:'Marcar como concluído'}).waitFor()
  await go('cursos/vue-github/exercicios/pizza-vue');assert(page.url().endsWith('/u02-m01'))
  await go('desafios');assert(page.url().includes('/atividades'));assert.equal(await page.locator('.mission-list > li').count(),27)
  await go('cursos/vue-github/desafios/pizza-vue-git-oficial');await page.getByRole('heading',{name:'Página não encontrada'}).waitFor()
  for(const file of ['apostila-aula-01.pdf','apostila-aula-02.pdf','slides-aula-01.pdf','slides-aula-02.pdf']) {
   const response=await page.request.get(base+'materiais/vue-github/oficiais/'+file)
   assert.equal(response.status(),200);assert.equal((await response.body()).subarray(0,4).toString(),'%PDF')
  }
  for(const file of ['kahoot-pizza-vue-git.pdf','projeto-aula-01.pdf','projeto-aula-02.pdf','pratica-aula-02.pdf','plano-aula-02.pdf','roteiro-aula-01-teoria.pdf','roteiro-aula-01-pratica.pdf']) {
   const response=await page.request.get(base+'materiais/vue-github/oficiais/'+file)
   assert.notEqual((await response.body()).subarray(0,4).toString(),'%PDF')
  }
  await go('');await page.getByRole('button',{name:'Abrir inventário de materiais'}).click()
  assert.equal(await page.getByRole('dialog').locator('.inventory-card').count(),6)
  assert.match(await page.getByRole('dialog').getByRole('link',{name:/Abrir Apostila oficial da Aula 01/}).getAttribute('href'), /apostila-aula-01\.pdf$/)
  assert.doesNotMatch(await page.getByRole('dialog').innerText(),/gabarito|guia do ministrante|aguardando|em breve/i)
  await page.getByRole('button',{name:'Fechar inventário',exact:true}).click()
  await page.evaluate(()=>localStorage.setItem('devlab-progress-v1','{broken'))
  await page.reload();await go('atividades')
  const blocked=await browser.newContext()
  await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}}))
  const blockedPage=await blocked.newPage();await blockedPage.goto(base+'#/cursos/vue-github/exercicios/u03-m01')
  await blockedPage.getByRole('button',{name:'Marcar como concluído'}).click();await blockedPage.getByRole('button',{name:'Marcar como pendente'}).waitFor()
  await blocked.close()
  console.log('PASS catálogo/progresso: filtros, aliases, IDs novos, reload, armazenamento inválido/bloqueado e quatro PDFs autorizados')
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
