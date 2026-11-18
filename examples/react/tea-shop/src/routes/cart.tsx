import { createFileRoute, Link } from '@tanstack/react-router'
import { useCartStore } from '../stores/cartStore.ts'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const getTotal = useCartStore((state) => state.getTotal)
  const total = getTotal()

  return (
    <section className="mx-auto max-w-xl">
      <h1 className="mb-8 text-3xl font-bold">ตะกร้า</h1>
      {items.length === 0 ? (
        <p className="text-stone-500">ตะกร้าว่าง</p>
      ) : (
        <div className="rounded-2xl border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 border-b border-stone-200 px-4 py-4 last:border-b-0 dark:border-stone-700"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-stone-500">
                  ฿{item.price} × {item.quantity}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 rounded border border-stone-300"
                    aria-label={`ลดจำนวน ${item.name}`}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 rounded border border-stone-300"
                    aria-label={`เพิ่มจำนวน ${item.name}`}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="ml-2 text-sm text-red-700"
                  >
                    ลบ
                  </button>
                </div>
              </div>
              <p className="font-bold text-amber-800 dark:text-amber-300">
                ฿{item.price * item.quantity}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between bg-stone-50 px-4 py-4 dark:bg-stone-800">
            <span className="font-bold">รวม</span>
            <span className="text-2xl font-bold">฿{total}</span>
          </div>
        </div>
      )}
      {items.length > 0 && (
        <Link
          to="/checkout"
          className="mt-6 block rounded-lg bg-amber-800 py-3 text-center font-semibold text-white hover:bg-amber-900"
        >
          สั่งชา
        </Link>
      )}
    </section>
  )
}
