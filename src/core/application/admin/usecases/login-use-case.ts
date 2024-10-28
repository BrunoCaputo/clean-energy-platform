import { Credentials } from '@/@types/admin'
import { IAdminRepository } from '@/core/data/repositories/admin-repository'
import { AdminEntity } from '@/core/domain/entities/admin-entity'

/**
 * Business rules for login the system administrator
 *
 * @param {Credentials} credentials Admin email and password
 * @param {IAdminRepository} repository Repository instance
 * @returns The admin data without the password
 */
export async function adminLoginUseCase(
  credentials: Credentials,
  repository: IAdminRepository,
): Promise<AdminEntity> {
  // TODO: Password encryption
  const { email, password } = credentials

  const { admin } = await repository.login({ email, password })

  return admin
}
