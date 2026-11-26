import { useState } from 'react'

export function ProductCard({
  product,
}: {
  product: { name: string; price: number; temperature: 'cold' | 'hot' }
}) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.temperature === 'cold' ? 'เย็น' : 'ร้อน'}</p>
      <p>฿{product.price}</p>
    </article>
  )
}

export function AddButton({ onAdd }: { onAdd: () => void }) {
  return (
    <button type="button" onClick={onAdd}>
      เพิ่มลงตะกร้า
    </button>
  )
}

export function Badge({ text = 'ใหม่' }: { text?: string }) {
  return <span>{text}</span>
}

export function PropsExample() {
  const [added, setAdded] = useState(false)

  return (
    <section>
      <h2>Props</h2>
      <Badge />
      <ProductCard
        product={{ name: 'ชานมไต้หวัน', price: 50, temperature: 'cold' }}
      />
      <AddButton onAdd={() => setAdded(true)} />
      {added && <p>เพิ่มชานมไต้หวันลงตะกร้าแล้ว</p>}
    </section>
  )
}
