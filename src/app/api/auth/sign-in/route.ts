import { NextRequest } from 'next/server'

import { adminLoginUseCase } from '@/core/application/admin/usecases/login-use-case'

/**
 * Sign in a system administrator
 *
 * @param {NextRequest} request The request object
 * @returns The admin user data without the password
 */
export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  try {
    const adminUser = await adminLoginUseCase({ email, password })

    return Response.json(adminUser, { status: 200 })
  } catch (error) {
    let errorMessage = 'Failed to login'
    const status = 401
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return Response.json({ error: errorMessage, status }, { status })
  }
}
