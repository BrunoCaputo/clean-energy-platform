import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

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
      <body className="bg-zinc-50 text-zinc-800 antialiased">{children}</body>
    </html>
  )
}
