import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { LoginFormData } from '../schemas/loginSchema.ts'
import { loginSchema } from '../schemas/loginSchema.ts'
import { useAuthStore } from '../stores/authStore.ts'

const fieldClass =
  'mt-1 w-full rounded-lg border border-stone-300 bg-white px-4 py-2 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-200 dark:border-stone-600 dark:bg-stone-900'

export function LoginForm() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    login(data.email)
    await navigate({ to: '/' })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900"
      noValidate
    >
      <div>
        <label htmlFor="email" className="font-medium">
          อีเมล
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          className={fieldClass}
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-700" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="font-medium">
          รหัสผ่าน
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="อย่างน้อย 8 ตัว"
          className={fieldClass}
          {...register('password')}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-700" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-amber-800 py-3 font-semibold text-white hover:bg-amber-900 disabled:cursor-not-allowed disabled:bg-amber-800/60"
      >
        {isSubmitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
      </button>
    </form>
  )
}
