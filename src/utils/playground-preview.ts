import runtime from 'vue/dist/vue.runtime.esm-browser.prod.js?raw'
import type { PlaygroundBuild } from './vue-playground'
import { playgroundPreviewBaseStyles } from '../content/playground-examples'

// Escape HTML parser delimiters, including user strings such as </script>.
const json = (value: unknown): string => JSON.stringify(value).replace(/</g, '\\u003c')

// Bootstrap must be a classic script: Firefox must register the import map
// before starting the first module graph through dynamic import().
export function previewDocument(build: PlaygroundBuild, token: number): string {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' blob:; style-src 'unsafe-inline'; img-src data: blob:; connect-src 'none'; form-action 'none';">
</head><body><div id="app" class="playground-mount"></div><script>
(async () => {
const token = ${token};
const report = (type, message = '') => parent.postMessage({ channel: 'devlab-preview', token, type, message }, '*');
const fail = error => report('error', String(error?.message ?? error));
addEventListener('error', event => fail(event.error ?? event.message));
addEventListener('unhandledrejection', event => fail(event.reason));
const blob = code => URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
try {
  for (const css of ${json([playgroundPreviewBaseStyles, ...build.styles])}) {
    const style = document.createElement('style'); style.textContent = css; document.head.append(style);
  }
  const runtimeUrl = blob(${json(runtime)});
  const map = document.createElement('script'); map.type = 'importmap';
  map.textContent = JSON.stringify({ imports: { vue: runtimeUrl } }); document.head.append(map);
  const moduleUrl = blob(${json(build.code)});
  const [{ createApp }, { default: component }] = await Promise.all([import(runtimeUrl), import(moduleUrl)]);
  let failed = false;
  const app = createApp(component);
  app.config.errorHandler = error => { failed = true; fail(error); };
  app.mount('#app');
  if (!failed) report('ready');
  URL.revokeObjectURL(moduleUrl);
} catch (error) { fail(error); }
})();
</script></body></html>`
}
