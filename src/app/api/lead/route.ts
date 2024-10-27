import { fetchLeadsUseCase } from '@/core/application/lead/usecases/fetch-leads-use-case'

export async function GET() {
  try {
    const fetchedLeads = await fetchLeadsUseCase()

    return Response.json(fetchedLeads, { status: 200 })
  } catch (error) {
    let errorMessage = 'Failed to fetch leads'
    const status = 401
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return Response.json({ error: errorMessage, status }, { status })
  }
}
