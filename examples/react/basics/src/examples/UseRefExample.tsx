import { useEffect, useRef } from 'react'

export function UseRefExample() {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const clicks = useRef(0)

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  return (
    <section>
      <h2>useRef</h2>
      <label>
        ชื่อผู้รับ
        <input ref={nameInputRef} type="text" placeholder="ชื่อบนแก้ว" />
      </label>
      <button
        type="button"
        onClick={() => {
          clicks.current += 1
        }}
      >
        นับใน ref (จอไม่เปลี่ยน)
      </button>
    </section>
  )
}
