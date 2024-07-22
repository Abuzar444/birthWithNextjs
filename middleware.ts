import { NextRequest } from "next/server";
import { updateSession } from "./utils/auth";

export const middleware = async (request: NextRequest) => {
  const session = request.cookies.get("session")?.value;
  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register"
  ) {
    return await updateSession(request);
  }
  if (session && !request?.nextUrl.pathname.startsWith("/")) {
    return Response.redirect(new URL("/", request.url));
  }
  if (!session && !request.nextUrl.pathname.startsWith("/register")) {
    return Response.redirect(new URL("/register", request.url));
  }
  return await updateSession(request);
};

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
