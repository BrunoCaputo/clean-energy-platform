import { Metadata } from 'next'
import Image from 'next/image'

import { SignInForm } from './components/sign-in-form'

export const metadata: Metadata = {
  title: 'SignIn',
}

export default async function SignInPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="/logo.svg"
        alt=""
        height={50}
        width={170}
        className="mb-5 h-auto w-auto"
        loading="lazy"
      />

      <SignInForm />
    </div>
  )
}
