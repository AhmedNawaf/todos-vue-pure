// src/composables/useAuth.ts
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signToken, verifyToken } from '@/utils/jwt'
import { hashPassword, verify } from '@/utils/hash' // your hash & compare
import { getItem } from '@/utils/localStorage' // typed localStorage.getItem
import type { IUser } from '@/types/auth'

let authInstance: ReturnType<typeof useAuth> | null = null

export default function useAuth() {
  if (authInstance) return authInstance

  const router = useRouter()

  const token = ref<string>(localStorage.getItem('token') || '')
  const user = ref<IUser | null>(null)
  const loading = ref(false)
  const error = ref<string>('')

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Helpers
  async function hydrateFromToken() {
    if (!token.value) return
    try {
      // 1️⃣ verify JWT and extract payload
      const payload = await verifyToken<{ userId: number }>(token.value)

      // 2️⃣ load users and find current
      const users = getItem('users') || []
      user.value = users.find((u) => u.id === payload.userId) || null

      if (!user.value) {
        // no match → force logout
        throw new Error('User not found')
      }
    } catch {
      // invalid/expired token or no such user
      logout()
    }
  }

  // 1) Register (your handleSubmit logic)
  async function register(name: string, email: string, plainPassword: string) {
    loading.value = true
    error.value = ''

    try {
      // a) hash the password
      const hashed = await hashPassword(plainPassword)

      // b) build & persist new user
      const newUser: IUser = {
        id: Date.now(),
        name,
        email,
        password: hashed,
      }
      const users = getItem('users') || []
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      // c) sign & store JWT
      const newToken = await signToken({ userId: newUser.id })
      localStorage.setItem('token', newToken)
      token.value = newToken
      user.value = newUser

      // d) redirect to home
      router.push('/')
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message || 'Registration failed'
      }
    } finally {
      loading.value = false
    }
  }

  // 2) Login
  async function login(email: string, plainPassword: string) {
    loading.value = true
    error.value = ''

    try {
      const users = getItem('users') || []
      const existing = users.find((u) => u.email === email)

      if (!existing) {
        throw new Error('No account found for this email')
      }
      const ok = await verify(plainPassword, existing.password)
      if (!ok) {
        throw new Error('Invalid credentials')
      }

      // issue new token
      const newToken = await signToken({ userId: existing.id })
      localStorage.setItem('token', newToken)
      token.value = newToken
      user.value = existing

      router.push('/')
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message || 'Login failed'
      }
    } finally {
      loading.value = false
    }
  }

  // 3) Logout
  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  // auto–hydrate on first load
  onMounted(hydrateFromToken)

  authInstance = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
  }
  return authInstance
}
