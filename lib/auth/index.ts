/**
 * Auth configuration module
 *
 * Provides NextAuth configuration for admin routes
 * Uses Stack Auth for user authentication
 */
import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: User & {
      role?: string;
    };
  }
}

/**
 * NextAuth configuration for admin API routes
 *
 * This is a minimal configuration for protecting admin routes.
 * The main user authentication is handled by Stack Auth.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check admin credentials from environment
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          console.warn("Admin credentials not configured");
          return null;
        }

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id: "admin",
            email: adminEmail,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
};

// Re-export stack auth utilities
export { stackServerApp, isStackAuthConfigured } from "./stack";
