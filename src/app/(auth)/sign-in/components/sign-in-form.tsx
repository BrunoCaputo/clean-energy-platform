'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { PasswordInput } from '@/presentation/components/password-input'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'

import { signInUser } from '../actions/sign-in-action'

const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Field must be a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type SignInFormType = z.infer<typeof signInSchema>

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
  })

  const router = useRouter()

  async function handleSignIn({ email, password }: SignInFormType) {
    try {
      const user = await signInUser({ email, password })

      toast.success('Welcome to Clean energy platform!')

      localStorage.setItem('cleanenergy:loggedUser', JSON.stringify(user))
      router.push('/')
    } catch (err) {
      let errorMessage = 'Cannot sign in'

      if (err instanceof Error) {
        const { error } = JSON.parse(err.message)
        errorMessage = error
      }

      toast.error(errorMessage)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="flex w-96 flex-col space-y-4"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && (
          <p className="text-xs text-rose-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput id="password" {...register('password')} />
        {errors.password && (
          <p className="text-xs text-rose-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        className="w-full bg-emerald-500 hover:bg-emerald-700"
        type="submit"
        disabled={isSubmitting}
      >
        Login
      </Button>
    </form>
  )
}
