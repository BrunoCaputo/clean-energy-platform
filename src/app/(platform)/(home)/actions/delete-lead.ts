'use server'

import { api } from '@/core/data/api'

export async function deleteLead(leadId: string): Promise<void> {
  const response = await api('/lead', {
    method: 'DELETE',
    body: JSON.stringify({ leadId }),
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error(JSON.parse(await response.text()))
  }
}
