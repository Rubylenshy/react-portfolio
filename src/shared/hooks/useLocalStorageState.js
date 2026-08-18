import { useEffect, useState } from 'react'

/**
 * useLocalStorageState — plain React state that mirrors itself to localStorage.
 * Reads once on mount, writes on every change. No cross-tab sync needed here.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - value (or factory) used when nothing is stored yet
 */
export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }
    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) return JSON.parse(stored)
    } catch (err) {
      console.warn(`useLocalStorageState: failed to read "${key}"`, err)
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn(`useLocalStorageState: failed to write "${key}"`, err)
    }
  }, [key, value])

  return [value, setValue]
}
