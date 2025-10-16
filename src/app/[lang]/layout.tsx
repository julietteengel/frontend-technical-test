import type { Metadata } from 'next'
import { Providers } from './providers'
import { LocaleProvider } from '@/contexts/LocaleContext'
import type { Locale } from '@/locales'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Leboncoin - Messages',
  description: 'Messaging interface for Leboncoin',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  // Middleware ensures lang is always a valid Locale
  const locale = lang as Locale

  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale}>
          <Providers>{children}</Providers>
        </LocaleProvider>
      </body>
    </html>
  )
}
