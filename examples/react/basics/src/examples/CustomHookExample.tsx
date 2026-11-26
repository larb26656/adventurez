import { useMemo, useState } from 'react'
import { products, type Product, type TeaFilter } from './teaTypes.ts'

const filters: { id: TeaFilter; label: string }[] = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'cold', label: 'เย็น' },
  { id: 'hot', label: 'ร้อน' },
]

export function useTeaFilter(products: Product[]) {
  const [filter, setFilter] = useState<TeaFilter>('all')

  const visibleProducts = useMemo(
    () =>
      products.filter(
        (product) => filter === 'all' || product.temperature === filter,
      ),
    [products, filter],
  )

  return { filter, setFilter, visibleProducts }
}

export function useCupCount() {
  const [count, setCount] = useState(0)
  const addCup = () => setCount((current) => current + 1)
  return { count, addCup }
}

export function CustomHookExample() {
  const { filter, setFilter, visibleProducts } = useTeaFilter(products)
  const { count, addCup } = useCupCount()

  return (
    <section>
      <h2>Custom hook</h2>
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
      <p>จำนวนแก้ว: {count}</p>
      <button type="button" onClick={addCup}>
        เพิ่มแก้ว
      </button>
    </section>
  )
}
