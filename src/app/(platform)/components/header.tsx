import Image from 'next/image'
import Link from 'next/link'

import { AccountMenu } from '@/presentation/components/account-menu'

export function Header() {
  return (
    <header className="flex h-full w-full items-center justify-between bg-violet-300 p-4">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt=""
          height={50}
          width={170}
          className="h-auto w-auto"
          loading="lazy"
        />
      </Link>

      <AccountMenu />
    </header>
  )
}
