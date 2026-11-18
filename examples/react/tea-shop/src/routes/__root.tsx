import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { useTheme } from '../contexts/ThemeContext.tsx'
import { useCartCount } from '../hooks/useCartCount.ts'
import { useAuthStore } from '../stores/authStore.ts'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const { theme, toggleTheme } = useTheme()
  const count = useCartCount()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col border-x border-stone-300 bg-[#fffaf3] dark:border-stone-700 dark:bg-stone-950">
        <header className="flex items-center justify-between gap-4 border-b border-stone-300 px-6 py-4 dark:border-stone-700">
          <Link to="/" className="text-2xl font-semibold tracking-tight">
            ร้านชา
          </Link>
          <nav className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-stone-300 px-3 py-1 text-sm dark:border-stone-600"
              aria-label={theme === 'light' ? 'เปิดโหมดมืด' : 'เปิดโหมดสว่าง'}
            >
              {theme === 'light' ? 'มืด' : 'สว่าง'}
            </button>
            {user ? (
              <button type="button" onClick={logout} className="text-sm">
                ออกจากระบบ
              </button>
            ) : (
              <Link to="/login" className="text-sm">
                เข้าสู่ระบบ
              </Link>
            )}
            <Link to="/cart" className="inline-flex items-center gap-2 text-lg">
              ตะกร้า
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-stone-800 px-1 text-sm dark:border-stone-200">
                {count}
              </span>
            </Link>
          </nav>
        </header>
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
