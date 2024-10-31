/**
 * Power supply type
 */
export type Supply = 'single-phase' | 'two-phase' | 'three-phase'

/**
 * Data to create a new consumption
 */
export interface ConsumptionData {
  monthCost: number
  city: string
  state: string
  supply: Supply
}

export interface EconomyMetadata {
  years: number
  totalOriginal: number
  totalWithDiscount: number
  totalSavings: number
}

export interface ConsumptionEconomy {
  originalMonthCost: number
  y1: EconomyMetadata
  y3: EconomyMetadata
  y5: EconomyMetadata
}
