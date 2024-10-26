import { Supply } from '@/@types/consumption'
import { ConsumptionEntity } from '@/domain/entities/consumption-entity'

import { db } from '../db'
import { consumption } from '../db/schema'

interface IConsumptionRepository {
  collectConsumptionData: (
    consumptionData: {
      monthCost: number
      city: string
      state: string
      supply: Supply
    },
    leadId: string,
  ) => Promise<{ consumption: ConsumptionEntity }>
}

export class ConsumptionRepository implements IConsumptionRepository {
  async collectConsumptionData(
    consumptionData: {
      monthCost: number
      city: string
      state: string
      supply: Supply
    },
    leadId: string,
  ): Promise<{ consumption: ConsumptionEntity }> {
    const { monthCost, city, state, supply } = consumptionData

    const [data] = await db
      .insert(consumption)
      .values({
        monthCost,
        city,
        state,
        supply,
        leadId,
      })
      .returning()

    return {
      consumption: new ConsumptionEntity(data),
    }
  }
}
