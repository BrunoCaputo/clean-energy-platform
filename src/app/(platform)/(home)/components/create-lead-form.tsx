'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'

import { createLead } from '../actions/create-lead'

const leadSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Must be a valid email address'),
  phone: z.string({ required_error: 'Phone is required' }).refine((doc) => {
    const replacedDoc = doc.replace(/\D/g, '')
    return !!Number(replacedDoc)
  }, 'Phone must have only numbers.'),
  cpf: z
    .string({ required_error: 'CPF is required' })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return replacedDoc.length >= 11
    }, 'CPF must have 11 characters.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return !!Number(replacedDoc)
    }, 'CPF must have only numbers.'),
})

type LeadType = z.infer<typeof leadSchema>

export function CreateLeadForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LeadType>({
    resolver: zodResolver(leadSchema),
  })

  async function handleLeadCreation(data: LeadType) {
    try {
      const { lead } = await createLead(data)

      console.log(lead)
    } catch (err) {
      let errorMessage = 'Cannot create lead'

      if (err instanceof Error) {
        const { error } = JSON.parse(err.message)
        errorMessage = error
      }

      toast.error(errorMessage)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleLeadCreation)}
      className="flex flex-col space-y-4"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" {...register('name')} />
        {errors.name && (
          <p className="text-xs text-rose-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && (
          <p className="text-xs text-rose-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" {...register('phone')} />
        {errors.phone && (
          <p className="text-xs text-rose-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          type="text"
          minLength={11}
          maxLength={11}
          {...register('cpf')}
        />
        {errors.cpf && (
          <p className="text-xs text-rose-500">{errors.cpf.message}</p>
        )}
      </div>

      <Button
        className="w-full bg-emerald-500 text-white hover:bg-emerald-700"
        type="submit"
        disabled={isSubmitting}
      >
        Create
      </Button>
    </form>
  )
}
