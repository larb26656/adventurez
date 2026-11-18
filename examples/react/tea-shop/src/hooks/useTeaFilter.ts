import { useMemo, useState } from 'react'
import type { Product, TeaFilter } from '../data/products.ts'

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
