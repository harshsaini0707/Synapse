import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/index";
import * as schema from "@/lib/db/schema";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: { strategy: "jwt"  ,
    maxAge :2 * 24 * 60 * 60,
  },
   jwt: {
    maxAge: 2* 24 * 60 * 60, 
  },

  callbacks: {
    async signIn({ user }) {
      try {
        // Check if user exists
        let dbUser = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, user.email!),
        });

      
        if (!dbUser) {
          await db.insert(schema.users).values({
            userName: user.name!,
            email: user.email!,
            image: user.image || "",
          });
        }

        return true;
      } catch (err) {
        console.error("SignIn error:", err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, user.email!),
        });
        if (dbUser) token.id = dbUser.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
