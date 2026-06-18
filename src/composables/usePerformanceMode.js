function isClient() {
  return typeof window !== 'undefined'
}

export function prefersReducedMotion() {
  return isClient() && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function prefersReducedData() {
  return isClient() && navigator.connection?.saveData === true
}

export function isCoarsePointer() {
  return isClient() && window.matchMedia('(pointer: coarse)').matches
}

export function shouldSkipIntro() {
  if (!isClient()) return false
  return prefersReducedMotion() || prefersReducedData()
}

export function shouldUseHeroScene() {
  if (!isClient()) return false
  return (
    !prefersReducedMotion() &&
    !prefersReducedData() &&
    !isCoarsePointer() &&
    window.innerWidth >= 1024
  )
}

export function shouldUseSmoothScroll() {
  if (!isClient()) return false
  return shouldUseHeroScene()
}

export function shouldUseLiteMode() {
  if (!isClient()) return false
  return prefersReducedMotion() || prefersReducedData() || window.innerWidth < 1024
}

export function scheduleIdle(task, timeout = 1200) {
  if (!isClient()) return null

  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(task, { timeout })
  }

  return window.setTimeout(task, timeout)
}
