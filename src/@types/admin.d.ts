/**
 * Admin credentials to login
 */
export interface Credentials {
  email: string
  password: string
}

/**
 * Admin user without password
 */
export interface AdminUser {
  id: string
  name: string
  email: string
}
