import { ILeadRepository } from '@/core/data/repositories/lead-repository'
import { LeadEntityType } from '@/core/domain/entities/lead-entity'

/**
 * Business rules for fetching the leads
 *
 * @param {ILeadRepository} repository Repository instance
 * @returns The leads data
 */
export async function fetchLeadsUseCase(
  repository: ILeadRepository,
): Promise<LeadEntityType[]> {
  try {
    const leads = await repository.fetchLeads()

    return leads
  } catch (error) {
    console.error(error)
    throw error
  }
}
