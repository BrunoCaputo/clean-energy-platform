import { NextRequest } from 'next/server'

import { getConsumptionsByLeadId } from '@/core/application/consumption/usecases/get-consumptions-by-lead-id-use-case'
import {
  ConsumptionRepository,
  IConsumptionRepository,
} from '@/core/data/repositories/consumption-repository'

const consumptionRepository: IConsumptionRepository =
  new ConsumptionRepository()

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl

  const leadId = pathname.split('/').pop() ?? ''

  try {
    const consumptions = await getConsumptionsByLeadId(
      leadId,
      consumptionRepository,
    )

    return Response.json({ consumptions, status: 200 }, { status: 200 })
  } catch (error) {
    let errorMessage = 'Failed to get consumptions'
    const status = 400
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return Response.json({ error: errorMessage, status }, { status })
  }
}
