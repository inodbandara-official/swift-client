import './globals.css'
import type { ReactNode } from 'react'
import RootProvider from '@/providers/RootProvider'

export const metadata = {
  title: 'SwiftTrack | Swift Logistics',
  description: 'Single-page portal for orders, billing, and client contracts.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
