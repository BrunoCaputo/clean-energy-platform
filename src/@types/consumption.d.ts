/**
 * Power supply type
 */
export type Supply = 'single-phase' | 'two-phase' | 'three-phase'

export interface ConsumptionData {
  monthCost: number
  city: string
  state: string
  supply: Supply
}
