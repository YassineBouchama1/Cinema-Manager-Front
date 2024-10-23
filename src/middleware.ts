import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/sessions";

export default async function middleware(req: NextRequest) {
  const authRoutes = ["/profile", "/admin"];
  const authRoutesAdmin = ["/admin", "/admin/*"];
  const authRoutesUser = ["/profile"];




  const session = await getSession();

  const redirectUrl = new URL("/", req.nextUrl.origin);

  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = authRoutesAdmin.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const isUserRoute = authRoutesUser.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // redirect unaythed users trying to access authenticated routes
  if (!session?.token && isAuthRoute) {
    return NextResponse.redirect(redirectUrl);
  }

  if (session?.token) {



    // redirect admins trying to access user-specific routes
    if (session.role === "admin" && isUserRoute) {
      return NextResponse.redirect(redirectUrl);
    }

    // rdirect users trying to access admin-specific routes
    if (session.role === "user" && isAdminRoute) {
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};