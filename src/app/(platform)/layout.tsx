import { PropsWithChildren } from 'react'

import { Footer } from './components/footer'
import { Header } from './components/header'

export default async function PlatformLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid h-screen grid-rows-[60px_auto_60px]">
      <Header />
      <main className="h-full w-full overflow-auto p-4">{children}</main>
      <Footer />
    </div>
  )
}
