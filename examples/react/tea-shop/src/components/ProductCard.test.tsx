import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test } from 'vitest'
import type { Product } from '../data/products.ts'
import { useCartStore } from '../stores/cartStore.ts'
import { ProductCard } from './ProductCard.tsx'

const milkTea: Product = {
  id: 'milk-tea',
  name: 'ชานมไต้หวัน',
  price: 50,
  image: '🧋',
  temperature: 'cold',
}

beforeEach(() => {
  localStorage.clear()
  useCartStore.setState({ items: [] })
})

test('เพิ่มชานมลงตะกร้าเมื่อกดปุ่ม', async () => {
  const user = userEvent.setup()
  render(<ProductCard product={milkTea} />)

  await user.click(screen.getByRole('button', { name: 'เพิ่มลงตะกร้า' }))

  expect(useCartStore.getState().items).toEqual([{ ...milkTea, quantity: 1 }])
})
