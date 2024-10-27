import { NextRequest } from 'next/server'

import { AdminRepository } from '@/data/repositories/admin-repository'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const repository = new AdminRepository()

  try {
    const adminUser = await repository.login({ email, password })

    return Response.json(adminUser, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 401 })
    }

    return Response.json({ error: 'Failed to login' }, { status: 401 })
  }
}
