import {
  ILeadConsumption,
  ILeadRepository,
  LeadRepository,
} from '@/core/data/repositories/lead-repository'
import { LeadEntityType } from '@/core/domain/entities/lead-entity'

/**
 * Business rules for fetching the leads
 *
 * @returns The leads and their consumptions
 */
export async function fetchLeadsUseCase(): Promise<
  (Omit<LeadEntityType, 'consumption'> & {
    consumption: ILeadConsumption[]
  })[]
> {
  const repository: ILeadRepository = new LeadRepository()

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
