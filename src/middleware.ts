/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './services/AuthService';
const AuthRoute = ["login", "register"]

type Role = keyof typeof RoleBaseRoute;

const RoleBaseRoute = {
    USER: ["/^\/profile/"],
    ADMIN: ["/^\/admin/"]
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const user = await getCurrentUser()

    if (!user) {
        if (AuthRoute.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(`/login?redirect=${pathname}`, request.url),
            );
        }
    }

    if (user?.role && RoleBaseRoute[user?.role as Role]) {
        const routes = RoleBaseRoute[user?.role as Role];

        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/login"],
}