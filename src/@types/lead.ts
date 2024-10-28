import { LeadEntityType } from '@/core/domain/entities/lead-entity'

/**
 * Export file type
 */
export type FileType = 'csv' | 'xlsx'

/**
 * Consumption data to assign to lead
 */
export interface ILeadConsumption {
  monthCost: number
  city: string
  state: string
}

/**
 * Data to create a new lead
 */
export interface LeadData {
  name: string
  email: string
  phone: string
  cpf: string
}

/**
 * Modified lead data to contain the assigned consumption data
 */
export type Lead = Omit<LeadEntityType, 'consumption'> & {
  consumption: ILeadConsumption[]
}
