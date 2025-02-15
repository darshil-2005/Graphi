import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { isUserOnBoarded } from '@/app/server/actions'


export async function middleware(request) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  const onBoarded = await isUserOnBoarded(session.user.email);  

  // if (!onBoarded && !(request.url.endsWith('onboarding'))){
  //   return NextResponse.redirect(new URL('/onboarding', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|$).*)"],
}