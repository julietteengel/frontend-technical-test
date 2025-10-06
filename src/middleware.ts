import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname already has a language
  if (pathname.startsWith('/en') || pathname.startsWith('/fr')) {
    return NextResponse.next()
  }

  // Redirect root to /fr
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
