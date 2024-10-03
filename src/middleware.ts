import { usePathname } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getSessions";





export default async function middleware(req: any) {


  const isIndexpage = req.nextUrl.pathname === "/";

  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const isGuestRoute = guestRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isSuperAdminRoute = authRoutesAdmin.some((route) =>
    req.nextUrl.pathname.endsWith(route)
  );
  const isAssociationRoute = authRoutesUser.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );



  //get session <data user auth>
  const session = await getSession();

  const redirectUrl = new URL("/", req.nextUrl.origin);


  //  check if try to visit authed routes without token
  if (!session?.token && isAuthRoute) {
    return NextResponse.redirect(redirectUrl); // redirect him to hom page
  }



  // // token avibal
  if (session?.token) {

    //   // protect if user dosnt active user
    //   if (!session?.isActive && isAuthRoute) {
    //     const redirectUrl = new URL(
    //       "/request-email-verification",
    //       req.nextUrl.origin
    //     );
    //     return NextResponse.redirect(redirectUrl);
    //   }


    //   // if try visit auth routes for super admin
    // if (session.role === 2 && isSuperAdminRoute) {
    //   return NextResponse.redirect(
    //     new URL("/dashboard", req.nextUrl.origin)
    //   );
    // }


    //   // if try visit auth routes for association admin
    //   if (session.role === 1 && isAssociationRoute) {
    //     return NextResponse.redirect(
    //       new URL("/dashboard", req.nextUrl.origin)
    //     );
    //   }



    //   if (session?.isActive && isGuestRoute) {
    //     return NextResponse.redirect(
    //       new URL("/dashboard", req.nextUrl.origin)
    //     );
    //   }
  }


}



const authRoutes = ["/profile"];

const authRoutesAdmin = [
  "/admin/movie",
  "/admin/room/*",
];

const authRoutesUser = [
  "/user",
];



const guestRoutes = [
  "/forgot-password",
  "/login",
  "/login",
  "/password-reset",
  "/register",
  "/",
];



export const config = {
  // Match only internationalized pathnames
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
