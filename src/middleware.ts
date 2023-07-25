import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // debug: true,
  publicRoutes: ["/"],
});

export const config = {
  // default matcher from clerk docs uses a regex, which is not helpful to debug
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // so we replace it by a simpler matcher
  // ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
  matcher: ["/", "/sign-in", "/sign-up", "/error"],
};
