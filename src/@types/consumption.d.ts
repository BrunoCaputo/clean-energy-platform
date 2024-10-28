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
