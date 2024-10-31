'use client'

import { ChartLine } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/presentation/components/ui/button'

interface ConsumptionEconomyButtonProps {
  consumptionId: string
}

export function ConsumptionEconomyButton({
  consumptionId,
}: ConsumptionEconomyButtonProps) {
  const router = useRouter()

  return (
    <Button
      variant="outline"
      onClick={() => router.push(`/consumption-economy/${consumptionId}`)}
    >
      <ChartLine className="h-3 w-3" />
    </Button>
  )
}
