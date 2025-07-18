import type { Todo } from '@/composables/useTodos'
import type { IUser } from '@/types/auth'

interface StorageSchema {
  todos: Todo[]
  users: IUser[]
  token: string | null
}

export function getItem<K extends keyof StorageSchema>(key: K): StorageSchema[K] | null {
  const raw = window.localStorage.getItem(key)
  if (raw === null) return null

  try {
    return JSON.parse(raw) as StorageSchema[K]
  } catch {
    console.warn(`Invalid JSON in localStorage for key “${key}”`)
    return null
  }
}

export function setItem<K extends keyof StorageSchema>(key: K, value: StorageSchema[K]): void {
  window.localStorage.setItem(key, JSON.stringify(value))
}
