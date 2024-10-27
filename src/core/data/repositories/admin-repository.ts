import { eq } from 'drizzle-orm'

import { AdminEntity } from '@/core/domain/entities/admin-entity'

import { db } from '../db'
import { admin } from '../db/schema'

interface IAdminRepository {
  login: (credentials: {
    email: string
    password: string
  }) => Promise<{ admin: AdminEntity }>
}

export class AdminRepository implements IAdminRepository {
  async login(credentials: {
    email: string
    password: string
  }): Promise<{ admin: AdminEntity }> {
    const { email, password } = credentials

    const [adminUser] = await db
      .select()
      .from(admin)
      .where(eq(admin.email, email))

    if (!adminUser) {
      throw new Error('Invalid email')
    }

    if (adminUser.password === password) {
      return {
        admin: new AdminEntity(adminUser),
      }
    }

    throw new Error('Invalid password')
  }
}
