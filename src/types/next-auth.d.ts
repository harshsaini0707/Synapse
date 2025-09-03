import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    jwt?: string;
  }

  interface User extends DefaultUser {
    id: string;
    jwt?: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    jwt?: string; 
  }
}
