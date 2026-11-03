import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useSectionNav() {
  const router = useRouter()
  const route = useRoute()

  async function scrollToSection(id: string, focus = true): Promise<void> {
    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
    if (focus) {
      const target =
        element.querySelector<HTMLElement>('h1, h2, h3') ?? element
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
  }

  async function afterRender(id: string): Promise<void> {
    await nextTick()
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
    await scrollToSection(id)
  }

  async function goHomeSection(id: string): Promise<void> {
    if (route.name !== 'home' && route.name !== 'course') {
      await router.push({ name: 'home' })
    }
    await afterRender(id)
  }

  async function goEncounterSection(
    slug: string,
    encounterId: string,
    sectionId: string,
  ): Promise<void> {
    if (
      route.name !== 'encounter' ||
      route.params.slug !== slug ||
      route.params.id !== encounterId
    ) {
      await router.push({ name: 'encounter', params: { slug, id: encounterId } })
    }
    await afterRender(sectionId)
  }

  async function goExerciseSection(id: string): Promise<void> {
    await afterRender(id)
  }

  function focusMain(): void {
    const main = document.getElementById('conteudo')
    if (!main) return
    main.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return {
    scrollToSection,
    goHomeSection,
    goEncounterSection,
    goExerciseSection,
    focusMain,
  }
}
