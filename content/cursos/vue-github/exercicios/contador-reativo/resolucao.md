Este texto pertence à resolução em breve do contador e não deve aparecer no site publicado.

A solução mantém o total em um `ref` e usa `Math.max` para impedir valores negativos:

```ts
const total = ref(0)
const incrementar = () => total.value++
const decrementar = () => { total.value = Math.max(0, total.value - 1) }
const reiniciar = () => { total.value = 0 }
```
