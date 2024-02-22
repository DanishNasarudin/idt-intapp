import { authMiddleware, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
// import { useClerk } from "@clerk/clerk-react";
// import { useRouter } from "next/navigation";

type UserData = RowDataPacket & {
  id: number;
  email: string;
  roles: string;
};

// const { signOut } = useClerk();
// const router = useRouter();

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
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.next();
    }
    if (req.nextUrl.pathname === "/") {
      // Handle redirect
      const newURL = new URL("/home", hostURL);
      return NextResponse.redirect(newURL);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      // Handle users who aren't authenticated
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
        return NextResponse.next();
      } else {
        const newURL = new URL("/unauthorized", hostURL);
        return NextResponse.rewrite(newURL);
      }
    }
  },
  publicRoutes: ["/home", "/info(.*)"], // unprotected pages
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
