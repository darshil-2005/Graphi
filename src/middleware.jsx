import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { hasCompletedOnboarding } from '@/app/server/actions'
import { redirect } from 'next/navigation';

export async function middleware(request) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const data = {
    email: session.user.email,
  }

  const response = await fetch(`${request.nextUrl.origin}/api/checkOnboardingStatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!(data.onBoarded)) {
        return false
      }
      return true
    })
    .catch((error) => console.error('Error:', error));    

  if (!response && !(request.url.endsWith('onboarding'))){
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|$).*)"],
}