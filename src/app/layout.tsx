import "./globals.css"
import ClientProviders from "@/components/providers/ClientProviders"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next';
export const metadata: Metadata = {
  title: 'Synapse',
  description: 'AI-powered learning platform',
  icons:{
    icon:'/logos/logo2.png',
    shortcut:'/logos/logo2.png',
    apple:'/logos/logo2.png'
  }

}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
            <Analytics />
        </ClientProviders>
      </body>
    </html>
  )
}
