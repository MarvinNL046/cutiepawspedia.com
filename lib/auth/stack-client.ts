"use client";

import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    home: "/",
    signIn: "/handler/sign-in",
    signUp: "/handler/sign-up",
    afterSignIn: "/en/account/favorites", // Redirect to account after login
    afterSignUp: "/en/account/favorites", // Redirect to account after signup
    signOut: "/handler/sign-out",
    afterSignOut: "/",
    accountSettings: "/en/account/notifications", // Our settings page
  },
});
