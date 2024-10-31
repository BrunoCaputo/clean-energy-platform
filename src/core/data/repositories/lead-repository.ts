import { desc, eq } from 'drizzle-orm'

import { LeadData } from '@/@types/lead'
import { LeadEntity, LeadEntityType } from '@/core/domain/entities/lead-entity'

import { db } from '../db'
import { consumption, lead } from '../db/schema'

/**
 * Lead repository interface
 */
export interface ILeadRepository {
  collectLeadData: (leadData: LeadData) => Promise<{ lead: LeadEntity }>

  fetchLeads: () => Promise<LeadEntityType[]>

  deleteLead: (leadId: string) => Promise<void>
}

/**
 * Lead repository implementation
 */
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

  async fetchLeads(): Promise<LeadEntityType[]> {
    const leads = await db
      .select({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        cpf: lead.cpf,
        createdAt: lead.createdAt,
      })
      .from(lead)
      .orderBy(desc(lead.createdAt))

    return leads
  }

  async deleteLead(leadId: string): Promise<void> {
    await db.delete(consumption).where(eq(consumption.leadId, leadId))

    const [deletedLead] = await db
      .delete(lead)
      .where(eq(lead.id, leadId))
      .returning()

    if (!deletedLead) {
      throw new Error(`Lead with id ${leadId} not found`, {
        cause: 404 /* status code */,
      })
    }
  }
}
