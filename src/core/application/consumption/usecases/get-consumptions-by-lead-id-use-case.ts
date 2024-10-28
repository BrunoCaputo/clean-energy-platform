import { IConsumptionRepository } from '@/core/data/repositories/consumption-repository'
import { ConsumptionEntity } from '@/core/domain/entities/consumption-entity'

/**
 * Get all the consumption that belongs to a specific lead
 *
 * @param {string} leadId ID of the lead owner
 * @param {IConsumptionRepository} repository Repository instance
 * @returns List of consumptions
 */
export async function getConsumptionsByLeadIdUseCase(
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
