import { useState } from 'react'
import { ComponentsExample } from './examples/ComponentsExample.tsx'
import { CustomHookExample } from './examples/CustomHookExample.tsx'
import { HooksIntro } from './examples/HooksIntro.tsx'
import { JsxExamples } from './examples/JsxExamples.tsx'
import { PropsExample } from './examples/PropsExample.tsx'
import { StylingExample } from './examples/StylingExample.tsx'
import { TypeScriptExample } from './examples/TypeScriptExample.tsx'
import { UseCallbackExample } from './examples/UseCallbackExample.tsx'
import { UseEffectExample } from './examples/UseEffectExample.tsx'
import { UseMemoExample } from './examples/UseMemoExample.tsx'
import { UseRefExample } from './examples/UseRefExample.tsx'
import { UseStateExample } from './examples/UseStateExample.tsx'

const examples = [
  {
    id: 'jsx',
    part: '01 JSX',
    title: 'แสดงราคา เงื่อนไข และลิสต์เมนู',
    Component: JsxExamples,
  },
  {
    id: 'components',
    part: '01 Components',
    title: 'การ์ดชาที่ใช้ซ้ำได้',
    Component: ComponentsExample,
  },
  {
    id: 'props',
    part: '01 Props',
    title: 'ส่งเมนูเข้าการ์ด และส่ง callback กลับ',
    Component: PropsExample,
  },
  {
    id: 'typescript',
    part: '01 TypeScript',
    title: 'รูปของสินค้าชาและตะกร้า',
    Component: TypeScriptExample,
  },
  {
    id: 'hooks',
    part: '02 Hooks',
    title: 'จำจำนวนแก้วข้ามการ render',
    Component: HooksIntro,
  },
  {
    id: 'state',
    part: '02 useState',
    title: 'ตัวกรองทั้งหมด เย็น ร้อน',
    Component: UseStateExample,
  },
  {
    id: 'effect',
    part: '02 useEffect',
    title: 'สลับธีมหลัง render',
    Component: UseEffectExample,
  },
  {
    id: 'ref',
    part: '02 useRef',
    title: 'โฟกัสช่องชื่อผู้รับ',
    Component: UseRefExample,
  },
  {
    id: 'memo',
    part: '02 useMemo',
    title: 'กรองเมนูเมื่อตัวกรองเปลี่ยน',
    Component: UseMemoExample,
  },
  {
    id: 'styling',
    part: '02 จัดหน้า',
    title: 'การ์ดด้วย CSS Module',
    Component: StylingExample,
  },
  {
    id: 'callback',
    part: '02 useCallback',
    title: 'คงฟังก์ชันเพิ่มลงตะกร้า',
    Component: UseCallbackExample,
  },
  {
    id: 'custom-hook',
    part: '02 Custom hook',
    title: 'useTeaFilter กับ useCupCount',
    Component: CustomHookExample,
  },
] as const

type ExampleId = (typeof examples)[number]['id']

function ActiveExample({
  example: Example,
}: {
  example: (typeof examples)[number]['Component']
}) {
  return <Example />
}

export function App() {
  const [active, setActive] = useState<ExampleId | null>(null)
  const current = examples.find((item) => item.id === active)

  return (
    <div className="page">
      <header>
        <h1>React พื้นฐาน</h1>
        <p className="lead">
          ตัวอย่างแยกบทของพาร์ต 1 และ 2 ก่อนประกอบเป็นร้านชา
        </p>
      </header>
      {current ? (
        <main>
          <button type="button" className="back" onClick={() => setActive(null)}>
            กลับไปรายการ
          </button>
          <p className="part">{current.part}</p>
          <ActiveExample example={current.Component} />
        </main>
      ) : (
        <main>
          <ul className="example-list">
            {examples.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => setActive(item.id)}>
                  <span>{item.part}</span>
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </main>
      )}
    </div>
  )
}
