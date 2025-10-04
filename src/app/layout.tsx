import "./globals.css"
import ClientProviders from "@/components/providers/ClientProviders"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Synapse',
  description: 'AI-powered learning platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
