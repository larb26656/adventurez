# React พื้นฐาน

แอปตัวอย่างของพาร์ต 1 และ 2 ในคอร์ส React Adventure หนึ่งไฟล์ต่อหนึ่งบท สลับดูจากหน้าแรก ไม่มี router

รันด้วย Node 22

```bash
npm install
npm run dev
```

เปิด `http://localhost:5173`

```bash
npm run build
```

ร้านชาที่ประกอบจากบทเหล่านี้ไปจน deploy อยู่ใน [examples/react/tea-shop](https://github.com/larb26656/adventurez/tree/main/examples/react/tea-shop)

## เวอร์ชันที่ล็อกไว้

| เครื่องมือ | major |
| --- | --- |
| Node | 22 |
| Vite | 7 |
| React | 19 |
| TypeScript | 5 |

Tailwind, TanStack Router, Zustand, React Hook Form และ Zod ยังไม่เข้ามาในแอปนี้ พวกนั้นอยู่ที่ร้านชาตั้งแต่พาร์ต 3

## บทเรียนกับไฟล์

| บท | ไฟล์ |
| --- | --- |
| 01 สร้างโปรเจกต์ | `package.json`, `index.html`, `vite.config.ts`, `src/main.tsx` |
| 01 JSX | `src/examples/JsxExamples.tsx` |
| 01 Components | `src/examples/ComponentsExample.tsx` |
| 01 Props | `src/examples/PropsExample.tsx` |
| 01 TypeScript | `src/examples/teaTypes.ts`, `src/examples/TypeScriptExample.tsx` |
| 02 Hooks | `src/examples/HooksIntro.tsx` |
| 02 useState | `src/examples/UseStateExample.tsx` |
| 02 useEffect | `src/examples/UseEffectExample.tsx` |
| 02 useRef | `src/examples/UseRefExample.tsx` |
| 02 useMemo | `src/examples/UseMemoExample.tsx` |
| 02 จัดหน้า | `src/examples/StylingExample.tsx`, `src/examples/TeaCard.module.css` |
| 02 useCallback | `src/examples/UseCallbackExample.tsx` |
| 02 Custom hook | `src/examples/CustomHookExample.tsx` |
| หน้ารวมตัวอย่าง | `src/App.tsx` |

หน้ารวมใช้ `useState` สลับตัวอย่าง ไม่ได้ติดตั้ง router
