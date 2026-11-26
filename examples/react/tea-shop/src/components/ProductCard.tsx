import { useCallback } from 'react'
import type { Product } from '../data/products.ts'
import { useCartStore } from '../stores/cartStore.ts'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const handleAdd = useCallback(() => {
    addItem(product)
  }, [addItem, product])

  return (
    <article className="flex flex-col rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      <div className="flex h-36 items-center justify-center rounded-xl bg-amber-50 text-6xl dark:bg-stone-800">
        <span role="img" aria-label={product.name}>
          {product.image}
        </span>
      </div>
      <h2 className="mt-3 text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-stone-500 dark:text-stone-400">
        {product.temperature === 'cold' ? 'เย็น' : 'ร้อน'}
      </p>
      <p className="mt-1 font-bold text-amber-800 dark:text-amber-300">
        ฿{product.price}
      </p>
      <button
        type="button"
        onClick={handleAdd}
        className="mt-4 w-full rounded-lg bg-amber-800 py-2 font-semibold text-white hover:bg-amber-900"
      >
        เพิ่มลงตะกร้า
      </button>
    </article>
  )
}
