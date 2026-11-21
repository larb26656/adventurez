export function TeaPrice() {
  const name = 'ชานมไต้หวัน'
  const price = 50
  const cold = true

  return (
    <p>
      {name} {price} บาท ({cold ? 'เย็น' : 'ร้อน'})
    </p>
  )
}

export function ColdBadge({ cold }: { cold: boolean }) {
  return <span>{cold ? 'เย็น' : 'ร้อน'}</span>
}

export function CartBadge({ count }: { count: number }) {
  return <span>{count > 0 && count}</span>
}

const menu = [
  { id: 'milk-tea', name: 'ชานมไต้หวัน' },
  { id: 'matcha', name: 'ชาเขียวมัทฉะ' },
]

export function MenuList() {
  return (
    <ul>
      {menu.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

export function JsxExamples() {
  return (
    <section>
      <h2>JSX</h2>
      <TeaPrice />
      <p>
        อุณหภูมิ: <ColdBadge cold /> และ <ColdBadge cold={false} />
      </p>
      <p>
        ตะกร้ามีของ: <CartBadge count={2} />
      </p>
      <p>
        ตะกร้าว่าง: <CartBadge count={0} />
      </p>
      <MenuList />
    </section>
  )
}
