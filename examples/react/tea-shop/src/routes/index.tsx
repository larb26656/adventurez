import { createFileRoute, type ErrorComponentProps } from '@tanstack/react-router'
import { ProductCard } from '../components/ProductCard.tsx'
import type { Product, TeaFilter } from '../data/products.ts'
import { useTeaFilter } from '../hooks/useTeaFilter.ts'

const filters: { id: TeaFilter; label: string }[] = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'cold', label: 'เย็น' },
  { id: 'hot', label: 'ร้อน' },
]

export const Route = createFileRoute('/')({
  loader: async () => {
    const response = await fetch('/products.json')
    if (!response.ok) {
      throw new Error('โหลดรายการชาไม่สำเร็จ')
    }

    const data: unknown = await response.json()
    if (!Array.isArray(data)) {
      throw new Error('รูปแบบเมนูชาไม่ถูกต้อง')
    }

    return { products: data as Product[] }
  },
  pendingComponent: CatalogPending,
  errorComponent: CatalogError,
  component: CatalogPage,
})

function CatalogPending() {
  return (
    <p className="text-stone-600 dark:text-stone-300">กำลังโหลดเมนูชา...</p>
  )
}

function CatalogError({ error }: ErrorComponentProps) {
  const message = error instanceof Error ? error.message : 'ไม่ทราบสาเหตุ'
  return (
    <p role="alert" className="text-red-700 dark:text-red-300">
      โหลดเมนูชาไม่สำเร็จ: {message}
    </p>
  )
}

function CatalogPage() {
  const { products } = Route.useLoaderData()
  const { filter, setFilter, visibleProducts } = useTeaFilter(products)

  return (
    <section>
      <h1 className="text-3xl font-bold">เมนูชา</h1>
      <div className="mt-4 flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={
              filter === item.id
                ? 'rounded-lg border border-amber-800 bg-amber-800 px-4 py-2 text-white'
                : 'rounded-lg border border-stone-300 bg-white px-4 py-2 text-stone-700 hover:border-amber-800 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100'
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      {visibleProducts.length === 0 ? (
        <p className="mt-8 text-stone-500">ไม่มีชาในหมวดนี้</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
