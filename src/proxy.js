import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
 
export async function proxy(request) {
    const session = await auth.api.getSession({
        query: {
            disableCookieCache: true,
        },
        headers: await headers(),
    })
    if (!session && !session?.user) {
        return NextResponse.redirect(new URL('/login', request.url) );
    }
}
 
 
export const config = {
  matcher: '/pets/:id*',
}