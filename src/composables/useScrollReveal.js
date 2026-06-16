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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
  },
}
