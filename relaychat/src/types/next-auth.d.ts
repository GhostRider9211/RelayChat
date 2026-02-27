import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      provider?: string;
      token?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    provider?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string;
      token?: string;
    };
  }
}