import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/index";
import * as schema from "@/lib/db/schema";
import jwt from "jsonwebtoken";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: { strategy: "jwt" },

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

          dbUser = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.email, user.email!),
          });
        }

        if (dbUser) {
          // Create JWT with jsonwebtoken
          const token = jwt.sign(
            { userId: dbUser.id },
            process.env.NEXTAUTH_SECRET!,
            { expiresIn: "7d" }
          );

          user.jwt = token; // <-- attach to user
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
        if (user?.jwt) token.jwt = user.jwt;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id;
        session.jwt = token.jwt as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
