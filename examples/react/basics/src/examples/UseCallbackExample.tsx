import { memo, useCallback, useState } from 'react'

const product = { id: 'milk-tea', name: 'ชานมไต้หวัน' }

function AddButton({ onAdd, label }: { onAdd: () => void; label: string }) {
  return (
    <button type="button" onClick={onAdd}>
      เพิ่ม{label}ลงตะกร้า
    </button>
  )
}

const MemoAddButton = memo(AddButton)

export function UseCallbackExample() {
  const [notice, setNotice] = useState('ยังไม่ได้เพิ่ม')

  const handleAdd = useCallback(() => {
    setNotice(`เพิ่ม ${product.name} แล้ว`)
  }, [product])

  return (
    <section>
      <h2>useCallback</h2>
      <p>{notice}</p>
      <MemoAddButton onAdd={handleAdd} label={product.name} />
    </section>
  )
}
