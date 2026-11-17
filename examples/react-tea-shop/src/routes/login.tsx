import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '../components/LoginForm.tsx'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-center text-3xl font-bold">เข้าสู่ระบบ</h1>
      <LoginForm />
      <p className="mt-4 text-center text-sm text-stone-500">
        ไม่มีเซิร์ฟเวอร์ ใส่อีเมลและรหัสผ่านที่ผ่านเงื่อนไขได้เลย
      </p>
    </div>
  )
}
