import { Credentials } from '@/@types/admin'
import { AdminRepository } from '@/core/data/repositories/admin-repository'
import { AdminEntity } from '@/core/domain/entities/admin-entity'

/**
 * Business rules for login the system administrator
 *
 * @param {Credentials} credentials the email and password
 * @returns The admin data without the password
 */
export async function adminLoginUseCase(
  credentials: Credentials,
): Promise<AdminEntity> {
  // TODO: Password encryption
  const { email, password } = credentials
  const repository: AdminRepository = new AdminRepository()

  const { admin } = await repository.login({ email, password })

  return admin
}
