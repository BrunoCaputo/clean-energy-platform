import Image from 'next/image'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <aside className="flex h-full items-center justify-center border-r border-solid border-r-violet-400 bg-violet-300">
        <Image
          src="/economy.svg"
          alt=""
          quality={100}
          width={600}
          height={600}
        />
      </aside>

      <main className="h-full">{children}</main>
    </div>
  )
}
