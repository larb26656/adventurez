# ร้านชา (React Tea Shop)

แอปตัวอย่างของคอร์ส React Adventure ร้านชาหน้าตาเดียวตั้งแต่บทแรกจน deploy ราคาเป็นบาท ไม่มี backend: login กับ checkout เป็นของจำลองในเบราว์เซอร์

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

## บทเรียนกับไฟล์

| บท | ไฟล์ |
| --- | --- |
| 01 Setup | `package.json`, `index.html`, `src/main.tsx` |
| 01 TypeScript | `src/data/products.ts` |
| 02 useMemo, custom hook | `src/hooks/useTeaFilter.ts` |
| 02 useCallback | `src/components/ProductCard.tsx` |
| 02 useEffect, Context | `src/contexts/ThemeContext.tsx` |
| 02 useRef, checkout | `src/components/CheckoutForm.tsx` |
| 02 custom hook | `src/hooks/useCartCount.ts` |
| 03 Tailwind | `src/index.css`, `vite.config.ts` |
| 03 Router | `src/main.tsx`, `src/routeTree.gen.ts`, `src/routes/` |
| 03 Layout | `src/routes/__root.tsx` |
| 04 Zustand | `src/stores/cartStore.ts` |
| 04 เชื่อม UI | `src/routes/index.tsx`, `src/routes/cart.tsx`, `src/components/ProductCard.tsx` |
| 05 Login | `src/schemas/loginSchema.ts`, `src/stores/authStore.ts`, `src/components/LoginForm.tsx`, `src/routes/login.tsx` |
| 05 Checkout | `src/schemas/checkoutSchema.ts`, `src/components/CheckoutForm.tsx`, `src/routes/checkout.tsx` |
| 06 Vercel | `vercel.json` |
| 07 Loader | `src/routes/index.tsx`, `public/products.json` |
| 08 Test | `src/components/ProductCard.test.tsx` |

เมนูในหน้าเว็บอ่านจาก `public/products.json` ผ่าน loader ของ TanStack Router รายการใน `src/data/products.ts` ต้องเป็นชุดเดียวกัน ใช้เป็น type และเป็นตัวอย่างในบทเรียน
