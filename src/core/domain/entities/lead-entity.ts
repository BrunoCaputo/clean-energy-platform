export class LeadEntity {
  private _id: string
  private _name: string
  private _email: string
  private _phone: string
  private _cpf: string
  private _createdAt: Date

  constructor(lead: {
    id: string
    name: string
    email: string
    phone: string
    cpf: string
    createdAt: string | Date
  }) {
    this._id = lead.id
    this._name = lead.name
    this._email = lead.email
    this._phone = lead.phone
    this._cpf = lead.cpf
    this._createdAt = new Date(lead.createdAt)
  }

  public toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      phone: this._phone,
      cpf: this._cpf,
      createdAt: this._createdAt.toISOString(),
    }
  }

  // GETTERS AND SETTERS
  public get id() {
    return this._id
  }

  public get name() {
    return this._name
  }

  public set name(newName: string) {
    this._name = newName
  }

  public get email() {
    return this._email
  }

  public set email(newEmail: string) {
    this._email = newEmail
  }

  public get phone() {
    return this._phone
  }

  public set phone(newPhone: string) {
    this._phone = newPhone
  }

  public get cpf() {
    return this._cpf
  }

  public set cpf(newCpf: string) {
    this._cpf = newCpf
  }

  public get createdAt() {
    return this._createdAt
  }
}
