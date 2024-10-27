import {
  ILeadConsumption,
  ILeadRepository,
} from '@/core/data/repositories/lead-repository'
import { LeadEntityType } from '@/core/domain/entities/lead-entity'

/**
 * Business rules for fetching the leads
 *
 * @param {ILeadRepository} repository The repository instance
 * @returns The leads and their consumptions
 */
export async function fetchLeadsUseCase(repository: ILeadRepository): Promise<
  (Omit<LeadEntityType, 'consumption'> & {
    consumption: ILeadConsumption[]
  })[]
> {
  try {
    const leads = await repository.fetchLeads()

    // Merge all consumptions that belong to the same lead
    const mergedLeads = Object.values(
      leads.reduce(
        (acc, lead) => {
          if (!acc[lead.id]) {
            acc[lead.id] = { ...lead, consumption: [] }
          }

          acc[lead.id].consumption.push(lead.consumption)
          return acc
        },
        {} as Record<
          string,
          Omit<LeadEntityType, 'consumption'> & {
            consumption: ILeadConsumption[]
          }
        >,
      ),
    )

    return mergedLeads
  } catch (error) {
    console.error(error)
    throw error
  }
}
