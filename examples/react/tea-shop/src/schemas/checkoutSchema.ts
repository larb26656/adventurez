import { z } from 'zod'

export const checkoutSchema = z.object({
  name: z.string().trim().min(1, 'กรุณากรอกชื่อผู้รับ'),
  note: z.string().trim().max(200, 'โน้ตยาวได้ไม่เกิน 200 ตัวอักษร'),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
