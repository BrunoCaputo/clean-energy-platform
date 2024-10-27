import { desc, eq } from 'drizzle-orm'

import { LeadEntity, LeadEntityType } from '@/core/domain/entities/lead-entity'

import { db } from '../db'
import { consumption, lead } from '../db/schema'

export interface ILeadConsumption {
  monthCost: number
  city: string
  state: string
}

export interface ILeadRepository {
  collectLeadData: (leadData: {
    name: string
    email: string
    phone: string
    cpf: string
  }) => Promise<{ lead: LeadEntity }>

  fetchLeads: () => Promise<
    (LeadEntityType & {
      consumption: ILeadConsumption
    })[]
  >
}

export class LeadRepository implements ILeadRepository {
  async collectLeadData(leadData: {
    name: string
    email: string
    phone: string
    cpf: string
  }): Promise<{ lead: LeadEntity }> {
    const { name, email, phone, cpf } = leadData

    const [data] = await db
      .insert(lead)
      .values({
        name,
        email,
        phone,
        cpf,
      })
      .returning()

    return { lead: new LeadEntity(data) }
  }

  async fetchLeads(): Promise<
    (LeadEntityType & {
      consumption: ILeadConsumption
    })[]
  > {
    const consumptionByLead = db.$with('consumption_by_lead').as(
      db
        .select({
          leadId: consumption.leadId,
          consumption: {
            monthCost: consumption.monthCost,
            city: consumption.city,
            state: consumption.state,
          },
        })
        .from(consumption)
        .orderBy(desc(consumption.createdAt)),
    )

    const leads = await db
      .with(consumptionByLead)
      .select({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        cpf: lead.cpf,
        createdAt: lead.createdAt,
        consumption: consumptionByLead.consumption,
      })
      .from(lead)
      .innerJoin(consumptionByLead, eq(lead.id, consumptionByLead.leadId))

    return leads
  }
}
