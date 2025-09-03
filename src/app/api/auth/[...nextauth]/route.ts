import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/index";
import * as schema from "@/lib/db/schema";
import { SignJWT } from "jose"; 

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

        // Create new user if not exist
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
          //  Create JWT using jose (Edge Runtime compatible)
          const token = await new SignJWT({ userId: dbUser.id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(new TextEncoder().encode(process.env.NEXTAUTH_SECRET!));

          user.jwt = token;
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
