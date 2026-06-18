import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let lenisTickerFn = null

/**
 * Initialize Lenis smooth scroll + GSAP ScrollTrigger integration.
 * Call once from App.vue or main layout.
 */
export function initLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
    infinite: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  lenisTickerFn = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(lenisTickerFn)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy()
    lenis = null
    if (lenisTickerFn) {
      gsap.ticker.remove(lenisTickerFn)
      lenisTickerFn = null
    }
  }
}

export function getLenis() {
  return lenis
}

/** Reduce motion check */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Fade-up stagger animation for a list of elements.
 */
export function useStaggerReveal(trigger, targets, staggerDelay = 0.08) {
  if (prefersReducedMotion()) return
  onMounted(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(targets, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: staggerDelay,
        scrollTrigger: { trigger, start: 'top 85%', once: true },
      })
    }, trigger)
    onUnmounted(() => ctx.revert())
  })
}

/**
 * Magnetic hover effect on an element.
 * Attach to a ref element — moves toward cursor when nearby.
 * @param {Ref<HTMLElement>} elRef
 * @param {number} [strength=0.35]
 */
export function useMagnetic(elRef, strength = 0.35) {
  if (prefersReducedMotion()) return

  onMounted(() => {
    const el = elRef.value
    if (!el) return

    function onMove(e) {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const threshold = Math.max(rect.width, rect.height) * 1.5

      if (dist < threshold) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    }

    function onLeave() {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    onUnmounted(() => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    })
  })
}

/**
 * Text scramble / reveal animation on scroll.
 * @param {Ref<HTMLElement>} elRef
 */
export function useTextReveal(elRef) {
  if (prefersReducedMotion()) return
  onMounted(() => {
    const el = elRef.value
    if (!el) return
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(el,
          { opacity: 0, y: 20, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
        )
      },
    })
    onUnmounted(() => trigger.kill())
  })
}
