import { Analytics } from '@vercel/analytics/next'
import { JetBrains_Mono, Noto_Sans_SC } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TursData Studio — Reactive Multi-Table Data Workspace',
  description:
    'Enterprise AI data workspace: multi-table source vault, Marimo reactive conversion pipeline, and artifact rendering canvas for tables, charts, PDF, PPT and CAD outputs.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#090d16',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      className={`dark bg-background ${notoSansSC.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
