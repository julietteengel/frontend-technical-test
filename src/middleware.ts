import { NextRequest, NextResponse } from 'next/server'
import { validateLocale } from '@/lib/validators'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Extract locale from URL
  const pathnameHasLocale = pathname.startsWith('/en') || pathname.startsWith('/fr')

  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1]
    const validLocale = validateLocale(locale)

    // Redirect if locale is invalid
    if (validLocale !== locale) {
      return NextResponse.redirect(new URL(`/${validLocale}${pathname.slice(3)}`, request.url))
    }

    return NextResponse.next()
  }

  // Redirect to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
