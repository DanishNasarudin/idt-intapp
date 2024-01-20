"use server";
import { searchUser } from "@/app/(serverActions)/FetchDB";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const validUser = await searchUser(user.email);
      console.log(validUser, "check from callback");

      if (
        validUser &&
        (validUser.roles === "Admin" || validUser.roles === "Staff")
      ) {
        return true;
      }

      return false;
    },
  },
});

export { handler as GET, handler as POST };
