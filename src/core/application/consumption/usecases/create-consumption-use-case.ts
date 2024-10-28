import { ConsumptionData } from '@/@types/consumption'
import { IConsumptionRepository } from '@/core/data/repositories/consumption-repository'
import { ConsumptionEntity } from '@/core/domain/entities/consumption-entity'

export async function createConsumptionUseCase(
  consumptionData: ConsumptionData,
  leadId: string,
  repository: IConsumptionRepository,
): Promise<ConsumptionEntity> {
  try {
    const { consumption } = await repository.collectConsumptionData(
      consumptionData,
      leadId,
    )

    return consumption
  } catch (error) {
    console.error(error)
    throw error
  }
}
