/**
 * Admin model
 */
export class AdminEntity {
  private _id: string
  private _name: string
  private _email: string
  private _password: string

  constructor(admin: {
    id: string
    name: string
    email: string
    password: string
  }) {
    this._id = admin.id
    this._name = admin.name
    this._email = admin.email
    this._password = admin.password
  }

  public toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
    }
  }

  public comparePassword(password: string): boolean {
    return this._password === password
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
}
