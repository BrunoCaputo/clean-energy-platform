import { AdminRepository } from '@/core/data/repositories/admin-repository'
import { AdminEntity } from '@/core/domain/entities/admin-entity'

export async function adminLoginUseCase(credentials: {
  email: string
  password: string
}): Promise<AdminEntity> {
  // TODO: Password encryption
  const { email, password } = credentials
  const repository: AdminRepository = new AdminRepository()

  const { admin } = await repository.login({ email, password })

  return admin
}
