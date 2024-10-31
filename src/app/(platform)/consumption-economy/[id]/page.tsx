import { ConsumptionEconomy } from '@/@types/consumption'
import { api } from '@/core/data/api'

import { EconomyCard } from './components/economy-card'

interface ConsumptionEconomyPageProps {
  params: {
    id: string
  }
}

async function getConsumptionEconomy(
  consumptionId: string,
): Promise<ConsumptionEconomy> {
  const response = await api(`/consumption/${consumptionId}/economy`, {
    next: {
      revalidate: 60 * 60,
    },
  })

  const { economy } = await response.json()

  return economy
}

export default async function ConsumptionEconomyPage({
  params,
}: ConsumptionEconomyPageProps) {
  const { id } = await params
  const { originalMonthCost, y1, y3, y5 } = await getConsumptionEconomy(id)

  return (
    <div className="flex flex-col gap-4">
      <p className="font-md self-start font-medium">
        Current month cost: {originalMonthCost}
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <EconomyCard metadata={y1} />
        <EconomyCard metadata={y3} />
        <EconomyCard metadata={y5} />
      </div>
    </div>
  )
}
