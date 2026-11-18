import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { CheckoutFormData } from '../schemas/checkoutSchema.ts'
import { checkoutSchema } from '../schemas/checkoutSchema.ts'
import { useCartStore } from '../stores/cartStore.ts'

const fieldClass =
  'mt-1 w-full rounded-lg border border-stone-300 bg-white px-4 py-2 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-200 dark:border-stone-600 dark:bg-stone-900'

interface PlacedOrder {
  name: string
  note: string
}

export function CheckoutForm() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [order, setOrder] = useState<PlacedOrder | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: '', note: '' },
  })
  const { ref: nameRegisterRef, ...nameField } = register('name')

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  const onSubmit = async (data: CheckoutFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    clearCart()
    setOrder({ name: data.name, note: data.note })
  }

  if (order) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-stone-900">
        <h2 className="text-2xl font-bold">รับออเดอร์แล้ว</h2>
        <p className="mt-2">ชื่อผู้รับ: {order.name}</p>
        {order.note ? <p className="mt-1">โน้ต: {order.note}</p> : null}
        <p className="mt-4 text-sm text-stone-600 dark:text-stone-300">
          ร้านรับออเดอร์นี้ไว้ในหน้าเว็บแล้ว ไม่มีการตัดเงินจริง
        </p>
        <Link to="/" className="mt-6 inline-block font-semibold text-amber-800">
          กลับไปเลือกชา
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p>ตะกร้าว่าง เลือกชาก่อนสั่ง</p>
        <Link to="/" className="mt-4 inline-block font-semibold text-amber-800">
          ไปที่เมนู
        </Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-lg space-y-4 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900"
      noValidate
    >
      <div>
        <label htmlFor="name" className="font-medium">
          ชื่อผู้รับ
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          {...nameField}
          ref={(node) => {
            nameRegisterRef(node)
            nameInputRef.current = node
          }}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-700" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="note" className="font-medium">
          โน้ตถึงร้าน
        </label>
        <textarea
          id="note"
          rows={3}
          placeholder="เช่น หวานน้อย แยกน้ำแข็ง"
          className={fieldClass}
          {...register('note')}
        />
        {errors.note && (
          <p className="mt-1 text-sm text-red-700" role="alert">
            {errors.note.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-amber-800 py-3 font-semibold text-white hover:bg-amber-900 disabled:cursor-not-allowed disabled:bg-amber-800/60"
      >
        {isSubmitting ? 'กำลังส่งออเดอร์...' : 'สั่งชา'}
      </button>
    </form>
  )
}
