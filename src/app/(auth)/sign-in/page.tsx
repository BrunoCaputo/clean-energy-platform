import { Metadata } from 'next'
import Image from 'next/image'

import { SignInForm } from './components/sign-in-form'

export const metadata: Metadata = {
  title: 'SignIn',
}

export default async function SignInPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <Image src="/logo.svg" alt="" height={50} width={170} />

      <SignInForm />
    </div>
  )
}
