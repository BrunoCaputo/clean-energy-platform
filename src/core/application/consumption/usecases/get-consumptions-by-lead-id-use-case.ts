import { IConsumptionRepository } from '@/core/data/repositories/consumption-repository'
import { ConsumptionEntity } from '@/core/domain/entities/consumption-entity'

export async function getConsumptionsByLeadId(
  leadId: string,
  repository: IConsumptionRepository,
): Promise<ConsumptionEntity[]> {
  try {
    const { consumptions } = await repository.getConsumptionsByLeadId(leadId)

    return consumptions
  } catch (error) {
    console.error(error)
    throw error
  }
}
