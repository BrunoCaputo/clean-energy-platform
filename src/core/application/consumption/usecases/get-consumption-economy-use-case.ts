import { ConsumptionEconomy, EconomyMetadata } from '@/@types/consumption'
import { IConsumptionRepository } from '@/core/data/repositories/consumption-repository'

function calculateEconomy(
  costAmount: number,
  discountPercentage: number,
  years: number,
): EconomyMetadata {
  const discountRate = 1 - discountPercentage / 100
  const totalOriginal = costAmount * 12 * years
  const totalWithDiscount = totalOriginal * discountRate

  return {
    years,
    totalOriginal,
    totalWithDiscount,
    totalSavings: totalOriginal - totalWithDiscount,
  }
}

export async function getConsumptionEconomy(
  consumptionId: string,
  repository: IConsumptionRepository,
): Promise<ConsumptionEconomy> {
  try {
    const {
      consumption: { monthCost },
    } = await repository.getConsumptionById(consumptionId)

    const [y1, y3, y5] = [1, 3, 5].map((year) =>
      calculateEconomy(monthCost, 25, year),
    )

    return { y1, y3, y5 }
  } catch (error) {
    console.error(error)
    throw error
  }
}
