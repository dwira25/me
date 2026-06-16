const MAX_TILT_DEG = 8

export const vTilt = {
  mounted(el) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

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

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
  },
}
