import { NextRequest } from 'next/server'

import { LeadData } from '@/@types/lead'
import { createLeadUseCase } from '@/core/application/lead/usecases/create-lead-use-case'
import { deleteLeadUseCase } from '@/core/application/lead/usecases/delete-lead-use-case'
import { fetchLeadsUseCase } from '@/core/application/lead/usecases/fetch-leads-use-case'
import {
  ILeadRepository,
  LeadRepository,
} from '@/core/data/repositories/lead-repository'

/**
 * Lead repository that contains the database access
 */
const leadRepository: ILeadRepository = new LeadRepository()

/**
 * Fetch all leads
 *
 * @returns All the leads
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
 * @param {NextRequest} request Request object
 * @returns If the lead was deleted
 */
export async function DELETE(request: NextRequest) {
  const { leadId } = await request.json()

  try {
    await deleteLeadUseCase(leadId, leadRepository)

    return Response.json({ deleted: true, status: 200 }, { status: 200 })
  } catch (error) {
    let errorMessage = `Failed to delete lead of ID ${leadId}`
    let status = 400
    if (error instanceof Error) {
      errorMessage = error.message
      status = (error.cause as number) ?? 400
    }

    return Response.json({ error: errorMessage, status }, { status })
  }
}

/**
 * Create a new lead
 *
 * @param {NextRequest} request Request object
 * @returns The created lead data
 */
export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, cpf } = (await request.json()) as LeadData

    const lead = await createLeadUseCase(
      { name, email, phone, cpf },
      leadRepository,
    )

    return Response.json({ lead, status: 201 }, { status: 201 })
  } catch (error) {
    let errorMessage = `Failed to create lead`
    let status = 400
    if (error instanceof Error) {
      errorMessage = error.message
      status = (error.cause as number) ?? 400
    }

    return Response.json({ error: errorMessage, status }, { status })
  }
}
