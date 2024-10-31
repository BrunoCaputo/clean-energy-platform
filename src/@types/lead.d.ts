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
