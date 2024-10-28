import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    template: '%s | Clean Energy Platform',
    default: 'Clean Energy Platform',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="box-border bg-zinc-50 text-zinc-800 antialiased">
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
