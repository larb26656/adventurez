import { useCartStore } from '../stores/cartStore.ts'

export function useCartCount() {
  return useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  )
}
