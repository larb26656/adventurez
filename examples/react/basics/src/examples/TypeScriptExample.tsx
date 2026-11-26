import { products, type CartItem } from './teaTypes.ts'

const sample: CartItem = { ...products[0], quantity: 2 }

export function TypeScriptExample() {
  return (
    <section>
      <h2>TypeScript</h2>
      <p>
        {sample.image} {sample.name} {sample.quantity} แก้ว รวม ฿
        {sample.price * sample.quantity}
      </p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.image} {product.name} ฿{product.price} (
            {product.temperature === 'cold' ? 'เย็น' : 'ร้อน'})
          </li>
        ))}
      </ul>
    </section>
  )
}
