'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select'
import { states } from '@/utils/states'

import { createConsumption } from '../actions/create-consumption'

const consumptionSchema = z.object({
  monthCost: z
    .number({ required_error: 'Month Cost is required', coerce: true })
    .min(0),
  city: z.string({ required_error: 'City is required' }),
  state: z.string({ required_error: 'State is required' }).refine((doc) => {
    return doc.length === 2
  }, 'State must have 2 characters'),
  supply: z.enum(['single-phase', 'two-phase', 'three-phase'], {
    required_error: 'Supply is required',
  }),
})

type ConsumptionType = z.infer<typeof consumptionSchema>

interface CreateConsumptionFormProps {
  leadId: string
}

export function CreateConsumptionForm({ leadId }: CreateConsumptionFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConsumptionType>({
    resolver: zodResolver(consumptionSchema),
  })

  async function handleConsumptionCreation(data: ConsumptionType) {
    try {
      const { consumption } = await createConsumption(data, leadId)

      console.log(consumption)
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
      onSubmit={handleSubmit(handleConsumptionCreation)}
      className="flex flex-col space-y-4"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="monthCost">Month Cost</Label>
        <Input
          id="monthCost"
          type="number"
          min={0}
          {...register('monthCost')}
        />
        {errors.monthCost && (
          <p className="text-xs text-rose-500">{errors.monthCost.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" type="text" {...register('city')} />
        {errors.city && (
          <p className="text-xs text-rose-500">{errors.city.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Controller
          name="state"
          control={control}
          render={({
            field: { name, onChange, value, disabled },
            fieldState: { error },
          }) => {
            return (
              <>
                <Select
                  defaultValue="AC"
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.key} value={state.key}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {error && (
                  <p className="text-xs text-rose-500">{error.message}</p>
                )}
              </>
            )
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="supply">Supply</Label>
        <Controller
          name="supply"
          control={control}
          render={({
            field: { name, onChange, value, disabled },
            fieldState: { error },
          }) => {
            return (
              <>
                <Select
                  defaultValue="single-phase"
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-phase">Single Phase</SelectItem>
                    <SelectItem value="two-phase">Two Phase</SelectItem>
                    <SelectItem value="three-phase">Three Phase</SelectItem>
                  </SelectContent>
                </Select>
                {error && (
                  <p className="text-xs text-rose-500">{error.message}</p>
                )}
              </>
            )
          }}
        />
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
