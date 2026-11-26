import { useState } from 'react'
import type { TeaFilter } from './teaTypes.ts'

const menu = [
  { id: 'milk-tea', name: 'ชานมไต้หวัน', temperature: 'cold' },
  { id: 'matcha', name: 'ชาเขียวมัทฉะ', temperature: 'hot' },
] as const

const filters: { id: TeaFilter; label: string }[] = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'cold', label: 'เย็น' },
  { id: 'hot', label: 'ร้อน' },
]

export function UseStateExample() {
  const [filter, setFilter] = useState<TeaFilter>('all')
  const [count, setCount] = useState(0)

  const visible = menu.filter(
    (item) => filter === 'all' || item.temperature === filter,
  )

  return (
    <section>
      <h2>useState</h2>
      <div className="actions">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            aria-pressed={filter === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul>
        {visible.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <p>จำนวนแก้ว: {count}</p>
      <button type="button" onClick={() => setCount((current) => current + 1)}>
        เพิ่มแก้ว
      </button>
    </section>
  )
}
