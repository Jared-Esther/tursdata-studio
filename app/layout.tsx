import { Analytics } from '@vercel/analytics/next'
import { Source_Sans_3 } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { QuickEscape } from '@/components/quick-escape'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Press Paws Project — Escape Abuse Together, No Pet Left Behind',
  description:
    'Press Paws Project arranges free, confidential emergency foster care and housing for the pets of domestic violence survivors across Australia, so people and animals can escape abuse together.',
  generator: 'v0.app',
  openGraph: {
    title: 'Press Paws Project',
    description:
      'Confidential emergency foster care for the pets of domestic violence survivors across Australia.',
    siteName: 'Press Paws Project',
    locale: 'en_AU',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-AU" className={`bg-background ${sourceSans.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        {children}
        <QuickEscape />
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
