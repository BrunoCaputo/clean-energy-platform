import { NextRequest } from 'next/server'

import { deleteLeadUseCase } from '@/core/application/lead/usecases/delete-lead-use-case'
import { fetchLeadsUseCase } from '@/core/application/lead/usecases/fetch-leads-use-case'
import {
  ILeadRepository,
  LeadRepository,
} from '@/core/data/repositories/lead-repository'

const leadRepository: ILeadRepository = new LeadRepository()

/**
 * Fetch all leads
 *
 * @returns The response containing all the leads
 */
export async function GET() {
  try {
    const fetchedLeads = await fetchLeadsUseCase(leadRepository)

    return Response.json({ leads: fetchedLeads, status: 200 }, { status: 200 })
  } catch (error) {
    let errorMessage = 'Failed to fetch leads'
    const status = 400
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return Response.json({ error: errorMessage, status }, { status })
  }
}

/**
 * Delete a single lead
 *
 * @param {NextRequest} request The request object
 * @returns The response containing if the lead was deleted
 */
export async function DELETE(request: NextRequest) {
  const { leadId } = await request.json()

  try {
    await deleteLeadUseCase(leadId, leadRepository)

    return Response.json({ deleted: true, status: 200 }, { status: 200 })
  } catch (error) {
    let errorMessage = `Failed to delete lead of ID ${leadId}`
    const status = 400
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return Response.json({ error: errorMessage, status }, { status })
  }
}
