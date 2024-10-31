'use server'

import { ConsumptionData } from '@/@types/consumption'
import { api } from '@/core/data/api'
import { ConsumptionEntity } from '@/core/domain/entities/consumption-entity'

export async function createConsumption(
  consumptionData: ConsumptionData,
  leadId: string,
): Promise<{ consumption: ConsumptionEntity; status: number }> {
  const response = await api(`/consumption/${leadId}`, {
    method: 'POST',
    body: JSON.stringify(consumptionData),
  })

  if (!response.ok) {
    throw new Error(JSON.parse(await response.text()))
  }

  return JSON.parse(await response.text())
}
