/// <reference types="vite/client" />

declare module 'virtual:devlab-content' {
  import type { SiteData } from './types/content'

  const data: SiteData
  export default data
}
