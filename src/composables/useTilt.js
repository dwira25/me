const MAX_TILT_DEG = 8

export const vTilt = {
  mounted(el) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion || isCoarsePointer) return

    el.classList.add('tilt-card')

    function handleMouseMove(event) {
      const rect = el.getBoundingClientRect()
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5
      const rotateX = (-offsetY * MAX_TILT_DEG).toFixed(2)
      const rotateY = (offsetX * MAX_TILT_DEG).toFixed(2)
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    function handleMouseLeave() {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }

    el._tiltHandlers = { handleMouseMove, handleMouseLeave }
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
  },
  unmounted(el) {
    if (el._tiltHandlers) {
      el.removeEventListener('mousemove', el._tiltHandlers.handleMouseMove)
      el.removeEventListener('mouseleave', el._tiltHandlers.handleMouseLeave)
      delete el._tiltHandlers
    }
  },
}
