'use client'
import { SessionProvider } from "next-auth/react"
import "./globals.css"
import QueryProvider from "@/providers/QueryProvider"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SessionProvider>
          <QueryProvider>
      {children}
          </QueryProvider>
        
        </SessionProvider>
      </body>
    </html>
  )
}
