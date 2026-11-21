import { useMemo, useState } from 'react'
import { products, type TeaFilter } from './teaTypes.ts'

const filters: { id: TeaFilter; label: string }[] = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'cold', label: 'เย็น' },
  { id: 'hot', label: 'ร้อน' },
]

export function UseMemoExample() {
  const [count, setCount] = useState(0)
  const [filter, setFilter] = useState<TeaFilter>('all')

  // ตัวอย่างที่ห้ามทำ ผลลัพธ์ไม่ได้ขึ้นกับ count
  const result = useMemo(() => {
    let total = 0
    for (let i = 0; i < 1000000; i++) total += i
    return total
  }, [count])

  const visibleProducts = useMemo(
    () =>
      products.filter(
        (product) => filter === 'all' || product.temperature === filter,
      ),
    [products, filter],
  )

  return (
    <section>
      <h2>useMemo</h2>
      <p>
        ผลบวกที่ไม่เกี่ยวกับตัวนับ: {result} (กดเพิ่มแล้วลูปวิ่งใหม่ทั้งที่คำตอบเดิม)
      </p>
      <button type="button" onClick={() => setCount((current) => current + 1)}>
        เพิ่มตัวนับ ({count})
      </button>
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
        {visibleProducts.map((product) => (
          <li key={product.id}>
            {product.image} {product.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
