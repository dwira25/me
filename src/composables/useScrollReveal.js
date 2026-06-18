/**
 * Global `v-reveal` directive: adds the `.reveal` class on mount and toggles
 * `.in-view` via IntersectionObserver so elements fade up into view once.
 */
export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')

    const delay = binding?.value?.delay ?? 0
    if (delay) {
      el.style.transitionDelay = `${delay}ms`
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('in-view')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          observer.unobserve(el)
          delete el._revealObserver
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    el._revealObserver = observer
    observer.observe(el)
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
    delete el._revealObserver
  },
}
