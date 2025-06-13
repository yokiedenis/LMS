
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton
} from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
//import { SessionProviderWrapper } from '@/components/SessionProviderWrapper' // Import SessionProvider
import ThemeSwitch from "@/components/theme-switch"
import ThemeContextProvider from '@/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EDUSKILL ONLINE LEARNING MANAGEMENT SYSTEM',
  description: 'Created By Eduskill Team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      localization={{
        signIn: {
          start: {
            title: "SignIn", // Customize "sign in to lms" to "Sign"
          },
        },
      }}
    >
      
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
      
    </ClerkProvider>
  )
}
