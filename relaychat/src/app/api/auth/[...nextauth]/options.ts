import { ISODateString, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export type CustomUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string;
  token?: string;
};

export const authOption: NextAuthOptions = {
  pages: {
    signIn: "/",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        (user as CustomUser).provider = "google";
        (user as CustomUser).token = account.id_token;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};