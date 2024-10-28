import { Supply } from '@/@types/consumption'

/**
 * Consumption model
 */
export class ConsumptionEntity {
  private _id: string
  private _monthCost: number
  private _city: string
  private _state: string
  private _supply: Supply
  private _createdAt: Date
  private _leadId: string

  constructor(consumption: {
    id: string
    monthCost: number
    city: string
    state: string
    supply: Supply
    createdAt: string | Date
    leadId: string
  }) {
    this._id = consumption.id
    this._monthCost = consumption.monthCost
    this._city = consumption.city
    this._state = consumption.state
    this._supply = consumption.supply
    this._createdAt = new Date(consumption.createdAt)
    this._leadId = consumption.leadId
  }

  public toJSON() {
    return {
      id: this._id,
      monthCost: this._monthCost,
      city: this._city,
      state: this._state,
      supply: this._supply,
      createdAt: this._createdAt.toISOString(),
      leadId: this._leadId,
    }
  }

  // GETTERS AND SETTERS
  public get id() {
    return this._id
  }

  public get monthCost() {
    return this._monthCost
  }

  public set monthCost(newMonthCost: number) {
    this._monthCost = newMonthCost
  }

  public get city() {
    return this._city
  }

  public set city(newCity: string) {
    this._city = newCity
  }

  public get state() {
    return this._state
  }

  public set state(newState: string) {
    this._state = newState
  }

  public get supply() {
    return this._supply
  }

  public set supply(newSupply: Supply) {
    this._supply = newSupply
  }

  public get createdAt() {
    return this._createdAt
  }

  public get leadId() {
    return this._leadId
  }
}
