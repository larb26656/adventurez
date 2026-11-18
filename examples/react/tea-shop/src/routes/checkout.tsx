import { createFileRoute } from '@tanstack/react-router'
import { CheckoutForm } from '../components/CheckoutForm.tsx'

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
})

function CheckoutPage() {
  return (
    <section>
      <h1 className="mb-6 text-center text-3xl font-bold">สั่งชา</h1>
      <CheckoutForm />
    </section>
  )
}
