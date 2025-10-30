// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    
  //  console.log(token?.id);
  //console.log(req);
    

  // Public routes that should not be redirected for auth
  // Added "/api/webhook" so external services (Dodo webhooks) can POST without being redirected
  const publicRoutes = ["/", "/signin", "/api/webhook"];
    if (pathname.startsWith("/api/webhook")) {
      return NextResponse.next();
    }
    
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const response = NextResponse.next();
    response.headers.set("x-user-id", token?.id as string);
    return response;

    
  },
  {
    callbacks: {
      authorized: () => true, 
     //This callback determines whether a user is authorized to access the matched route. (As we manullay adding routes)
    },
  }
);

export const config = {
  matcher: [
    // Exclude api/auth, api/webhook, _next/static, _next/image, and favicon.ico
    "/((?!api/auth|api/webhook|_next/static|_next/image|favicon.ico).*)",
  ],
};
