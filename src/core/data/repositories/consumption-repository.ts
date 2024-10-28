import { eq } from 'drizzle-orm'

import { Supply } from '@/@types/consumption'
import { ConsumptionEntity } from '@/core/domain/entities/consumption-entity'

import { db } from '../db'
import { consumption } from '../db/schema'

export interface IConsumptionRepository {
  collectConsumptionData: (
    consumptionData: {
      monthCost: number
      city: string
      state: string
      supply: Supply
    },
    leadId: string,
  ) => Promise<{ consumption: ConsumptionEntity }>

  getConsumptionsByLeadId(
    leadId: string,
  ): Promise<{ consumptions: ConsumptionEntity[] }>
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

  async getConsumptionsByLeadId(
    leadId: string,
  ): Promise<{ consumptions: ConsumptionEntity[] }> {
    const data = await db
      .select()
      .from(consumption)
      .where(eq(consumption.leadId, leadId))

    return {
      consumptions: data.map(
        (consumptionData) => new ConsumptionEntity(consumptionData),
      ),
    }
  }
}
