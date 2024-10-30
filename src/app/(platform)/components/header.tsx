import Image from 'next/image'

import { NavLink } from '@/presentation/components/nav-link'

export function Header() {
  return (
    <header className="flex h-full w-full items-center justify-between bg-violet-300 p-4">
      <Image
        src="/logo.svg"
        alt=""
        height={50}
        width={170}
        className="h-auto w-auto"
        loading="lazy"
      />

      <nav className="flex items-center gap-4">
        <NavLink href="/">Leads</NavLink>
        <NavLink href="/consumption">Consumptions</NavLink>
      </nav>
    </header>
  )
}
