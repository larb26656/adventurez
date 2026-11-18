# ร้านชา (React Tea Shop)

แอปตัวอย่างของคอร์ส React Adventure ตั้งแต่พาร์ต 3 จน deploy ราคาเป็นบาท ไม่มี backend: login กับ checkout เป็นของจำลองในเบราว์เซอร์

รันด้วย Node 22

```bash
npm install
npm run dev
```

เปิด `http://localhost:5173`

```bash
npm test
npm run build
```

## เวอร์ชันที่ล็อกไว้

| เครื่องมือ | major |
| --- | --- |
| Node | 22 |
| Vite | 7 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| TanStack Router | 1 |
| Zustand | 5 |
| React Hook Form | 7 |
| Zod | 3 |

Tailwind ใช้ Vite plugin ของ v4 ไม่มี `tailwind.config.js`

พาร์ต 1 และ 2 อยู่คนละโปรเจกต์ ที่ [examples/react/basics](https://github.com/larb26656/adventurez/tree/main/examples/react/basics) ร้านนี้เริ่มตั้งแต่พาร์ต 3

## บทเรียนกับไฟล์

| บท | ไฟล์ |
| --- | --- |
| 03 Tailwind | `src/index.css`, `vite.config.ts` |
| 03 Router | `src/main.tsx`, `src/routeTree.gen.ts`, `src/routes/` |
| 03 Layout | `src/routes/__root.tsx` |
| 03 เมนู, ตะกร้า, login | `src/routes/index.tsx`, `src/routes/cart.tsx`, `src/routes/login.tsx`, `src/data/products.ts` |
| 04 Zustand | `src/stores/cartStore.ts` |
| 04 เชื่อม UI | `src/routes/index.tsx`, `src/routes/cart.tsx`, `src/components/ProductCard.tsx`, `src/hooks/useCartCount.ts` |
| 04 ธีม | `src/contexts/ThemeContext.tsx` |
| 05 Login | `src/schemas/loginSchema.ts`, `src/stores/authStore.ts`, `src/components/LoginForm.tsx`, `src/routes/login.tsx` |
| 05 Checkout | `src/schemas/checkoutSchema.ts`, `src/components/CheckoutForm.tsx`, `src/routes/checkout.tsx` |
| 06 Vercel | `vercel.json` |
| 07 Loader | `src/routes/index.tsx`, `public/products.json` |
| 08 Test | `src/components/ProductCard.test.tsx` |

`src/hooks/useTeaFilter.ts` คือตัวกรองของหน้าร้าน จับคู่กับ `useTeaFilter` ในตัวอย่างฝึก แต่รับรายการจาก loader

เมนูในหน้าเว็บอ่านจาก `public/products.json` ผ่าน loader ของ TanStack Router รายการใน `src/data/products.ts` ต้องเป็นชุดเดียวกัน ใช้เป็น type และเป็นตัวอย่างในบทเรียน
