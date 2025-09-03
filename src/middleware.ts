// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; 

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    
    //  Verify custom JWT using jose (Edge Runtime compatible)
    if (token?.jwt) {
      try {
        const { payload } = await jwtVerify(
          token.jwt as string,
          new TextEncoder().encode(process.env.NEXTAUTH_SECRET!) //  Encode secret as bytes
        );
        
        console.log("Decoded custom JWT:", payload);
      } catch (error) {
        console.error("JWT verification failed:", error);
      }
    }

    
    const { pathname } = req.nextUrl;

    // Protect admin routes
    if (pathname.startsWith("/admin") && !token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token; // Allow access if token exists
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
