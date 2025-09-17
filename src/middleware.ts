// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    
  //  console.log(token?.id);
  //console.log(req);
    

    const publicRoutes = ["/", "/signin"];

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
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
