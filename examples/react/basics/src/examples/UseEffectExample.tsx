import { useEffect, useState } from 'react'

export function UseEffectExample() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('basics-theme', theme)
    return () => {
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <section>
      <h2>useEffect</h2>
      <p>ธีมตอนนี้: {theme === 'dark' ? 'มืด' : 'สว่าง'}</p>
      <button
        type="button"
        onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      >
        สลับธีม
      </button>
    </section>
  )
}
