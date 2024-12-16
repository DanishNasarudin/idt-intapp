import { authMiddleware, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth: async (auth, req, evt) => {
    let hostURL;
    // let hostURL = req.url;
    if (process.env.NODE_ENV === "production") {
      hostURL = `${
        req.nextUrl.protocol +
        "//" +
        req.nextUrl.hostname +
        req.nextUrl.pathname
      }`;
    } else {
      hostURL = req.url;
    }

    // console.log(`Request received: ${req.method} ${hostURL}`);

    if (process.env.NODE_ENV !== "production") {
      // console.log("Environment is not production, proceeding to next.");
      return NextResponse.next();
    }
    if (req.nextUrl.pathname === "/") {
      // Handle redirect
      const newURL = new URL("/home", hostURL);
      // console.log("Redirecting to /home");
      return NextResponse.redirect(newURL);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      // Handle users who aren't authenticated
      // console.log("User is not authenticated, redirecting to sign in.");
      return redirectToSignIn({ returnBackUrl: hostURL });
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    // if (auth.userId && !auth.isPublicRoute) {
    if (auth.userId) {
      const user = await clerkClient.users.getUser(auth.userId);
      const userData = user.privateMetadata;
      //   console.log(userData);

      if (userData.role === "Admin" || userData.role === "Staff") {
        // console.log("pass");
        // console.log(
        //   `User ${auth.userId} is authorized with role ${userData.role}`
        // );
        return NextResponse.next();
      } else {
        const newURL = new URL("/unauthorized", hostURL);
        // console.log(
        //   `User ${auth.userId} is unauthorized, rewriting to /unauthorized`
        // );
        return NextResponse.rewrite(newURL);
      }
    }
  },
  clockSkewInMs: 15000,
  publicRoutes: ["/home", "/info(.*)", "/sign-in(.*)"], // unprotected pages
  // debug: true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
