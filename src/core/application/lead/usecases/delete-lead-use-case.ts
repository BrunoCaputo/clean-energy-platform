import { ILeadRepository } from '@/core/data/repositories/lead-repository'

/**
 * Business rules for delete a single lead
 *
 * @param {string} leadId ID of the lead to be deleted
 * @param {ILeadRepository} repository Repository instance
 */
export async function deleteLeadUseCase(
  leadId: string,
  repository: ILeadRepository,
): Promise<void> {
  try {
    return repository.deleteLead(leadId)
  } catch (error) {
    console.error(error)
    throw error
  }
}
