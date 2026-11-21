import { useState } from 'react'

export function HooksIntro() {
  const [count, setCount] = useState(0)

  return (
    <section>
      <h2>Hooks</h2>
      <p>ตัวแปรธรรมดาเริ่มใหม่ทุกครั้งที่ render useState จำจำนวนแก้วไว้</p>
      <p>จำนวนแก้ว: {count}</p>
      <button type="button" onClick={() => setCount((current) => current + 1)}>
        เพิ่มแก้ว
      </button>
    </section>
  )
}
