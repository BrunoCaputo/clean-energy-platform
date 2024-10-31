import { NextRequest } from 'next/server'

import { getConsumptionEconomy } from '@/core/application/consumption/usecases/get-consumption-economy-use-case'
import {
  ConsumptionRepository,
  IConsumptionRepository,
} from '@/core/data/repositories/consumption-repository'

/**
 * Consumption repository that contains the database access
 */
const consumptionRepository: IConsumptionRepository =
  new ConsumptionRepository()

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl

  const consumptionId = pathname.split('/').at(-2) ?? ''

  try {
    const economy = await getConsumptionEconomy(
      consumptionId,
      consumptionRepository,
    )

    return Response.json({ economy, status: 200 }, { status: 200 })
  } catch (error) {
    let errorMessage = 'Failed to get consumption economy'
    const status = 400
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return Response.json({ error: errorMessage, status }, { status })
  }
}
