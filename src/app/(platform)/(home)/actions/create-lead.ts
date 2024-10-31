'use server'

import { LeadData } from '@/@types/lead'
import { api } from '@/core/data/api'
import { LeadEntity } from '@/core/domain/entities/lead-entity'

export async function createLead(
  leadData: LeadData,
): Promise<{ lead: LeadEntity; status: number }> {
  const response = await api('/lead', {
    method: 'POST',
    body: JSON.stringify(leadData),
  })

  if (!response.ok) {
    throw new Error(JSON.parse(await response.text()))
  }

  return JSON.parse(await response.text())
}
