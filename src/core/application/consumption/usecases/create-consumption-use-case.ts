import { ConsumptionData } from '@/@types/consumption'
import { IConsumptionRepository } from '@/core/data/repositories/consumption-repository'
import { ConsumptionEntity } from '@/core/domain/entities/consumption-entity'

/**
 * Business rules for consumption creation
 *
 * @param {ConsumptionData} consumptionData Creation consumption data
 * @param {string} leadId ID of the lead owner
 * @param {IConsumptionRepository} repository Repository instance
 * @returns The complete consumption data
 */
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
