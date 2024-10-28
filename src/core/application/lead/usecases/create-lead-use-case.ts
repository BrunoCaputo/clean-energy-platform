import { LeadData } from '@/@types/lead'
import { ILeadRepository } from '@/core/data/repositories/lead-repository'
import { LeadEntity } from '@/core/domain/entities/lead-entity'

/**
 * Business rules for lead creation
 *
 * @param {LeadData} leadData Creation lead data
 * @param {ILeadRepository} repository Repository instance
 * @returns The complete lead data
 */
export async function createLeadUseCase(
  leadData: LeadData,
  repository: ILeadRepository,
): Promise<LeadEntity> {
  try {
    const { lead } = await repository.collectLeadData(leadData)

    return lead
  } catch (error) {
    console.error(error)
    throw error
  }
}
