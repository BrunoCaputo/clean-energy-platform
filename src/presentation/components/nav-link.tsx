'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { AnchorHTMLAttributes, PropsWithChildren, RefAttributes } from 'react'

type NavLinkProps = PropsWithChildren<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps &
    RefAttributes<HTMLAnchorElement>
>

export function NavLink({ children, ...props }: NavLinkProps) {
  const currentPath = usePathname()

  return (
    <Link {...props}>
      <span
        className={`text-sm ${currentPath === props.href ? 'text-violet-700' : 'text-zinc-800 hover:text-zinc-600'}`}
      >
        {children}
      </span>
    </Link>
  )
}
