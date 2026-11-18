import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthUser {
  email: string
}

interface AuthStore {
  user: AuthUser | null
  login: (email: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (email) => set({ user: { email } }),
      logout: () => set({ user: null }),
    }),
    { name: 'tea-shop-auth' },
  ),
)
