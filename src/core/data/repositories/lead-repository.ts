import { LeadEntity } from '@/core/domain/entities/lead-entity'

import { db } from '../db'
import { lead } from '../db/schema'

interface ILeadRepository {
  collectLeadData: (leadData: {
    name: string
    email: string
    phone: string
    cpf: string
  }) => Promise<{ lead: LeadEntity }>
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
}
