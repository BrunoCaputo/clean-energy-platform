'use server'

import { Credentials } from '@/@types/admin'
import { api } from '@/core/data/api'

export async function signInUser({
  email,
  password,
}: Credentials): Promise<{ id: string; name: string; email: string }> {
  const response = await api('/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }

  return JSON.parse(await response.text())
}
