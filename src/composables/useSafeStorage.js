function isClient() {
  return typeof window !== 'undefined'
}

function readStorage(storage, key, fallback = null) {
  if (!isClient() || !storage) return fallback

  try {
    const value = storage.getItem(key)
    return value ?? fallback
  } catch (_) {
    return fallback
  }
}

function writeStorage(storage, key, value) {
  if (!isClient() || !storage) return false

  try {
    storage.setItem(key, value)
    return true
  } catch (_) {
    return false
  }
}

export function safeLocalStorageGet(key, fallback = null) {
  return readStorage(window.localStorage, key, fallback)
}

export function safeLocalStorageSet(key, value) {
  return writeStorage(window.localStorage, key, value)
}

export function safeSessionStorageGet(key, fallback = null) {
  return readStorage(window.sessionStorage, key, fallback)
}

export function safeSessionStorageSet(key, value) {
  return writeStorage(window.sessionStorage, key, value)
}
