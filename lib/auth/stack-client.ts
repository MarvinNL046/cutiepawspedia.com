"use client";

import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    home: "/",
    signIn: "/handler/sign-in",
    signUp: "/handler/sign-up",
    afterSignIn: "/en",
    afterSignUp: "/en",
    signOut: "/handler/sign-out",
    afterSignOut: "/",
    accountSettings: "/handler/account-settings",
  },
});
