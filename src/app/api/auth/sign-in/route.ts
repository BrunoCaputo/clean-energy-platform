import { NextRequest } from 'next/server'

import { AdminRepository } from '@/data/repositories/admin-repository'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const repository = new AdminRepository()

  try {
    const adminUser = await repository.login({ email, password })

    return Response.json(adminUser, { status: 200 })
  } catch (error) {
    let errorMessage = 'Failed to login'
    const status = 401
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return Response.json({ error: errorMessage }, { status })
  }
}
