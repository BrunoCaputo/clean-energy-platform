import { LeadEntityType } from '@/core/domain/entities/lead-entity'

export type FileType = 'csv' | 'xlsx'

export interface ILeadConsumption {
  monthCost: number
  city: string
  state: string
}

export interface LeadData {
  name: string
  email: string
  phone: string
  cpf: string
}

export type Lead = Omit<LeadEntityType, 'consumption'> & {
  consumption: ILeadConsumption[]
}
