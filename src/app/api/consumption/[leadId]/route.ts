import { NextRequest } from 'next/server'

import { ConsumptionData } from '@/@types/consumption'
import { createConsumptionUseCase } from '@/core/application/consumption/usecases/create-consumption-use-case'
import { getConsumptionsByLeadIdUseCase } from '@/core/application/consumption/usecases/get-consumptions-by-lead-id-use-case'
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
    const consumptions = await getConsumptionsByLeadIdUseCase(
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

export async function POST(request: NextRequest) {
  const { pathname } = request.nextUrl

  const leadId = pathname.split('/').pop() ?? ''

  try {
    const { monthCost, city, state, supply } =
      (await request.json()) as ConsumptionData

    const consumption = await createConsumptionUseCase(
      { monthCost, city, state, supply },
      leadId,
      consumptionRepository,
    )

    return Response.json({ consumption, status: 201 }, { status: 201 })
  } catch (error) {
    let errorMessage = 'Failed to create consumption'
    const status = 400
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return Response.json({ error: errorMessage, status }, { status })
  }
}
