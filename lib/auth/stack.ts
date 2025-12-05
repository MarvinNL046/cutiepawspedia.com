import "server-only";
import { StackServerApp } from "@stackframe/stack";

// Check if Stack Auth is configured
const isStackAuthConfigured = Boolean(
  process.env.NEXT_PUBLIC_STACK_PROJECT_ID &&
  process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY &&
  process.env.STACK_SECRET_SERVER_KEY
);

function createStackServerApp() {
  if (!isStackAuthConfigured) {
    console.warn("Stack Auth not configured - auth features will be disabled");
    return null;
  }

  return new StackServerApp({
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
}

export const stackServerApp = createStackServerApp();
export { isStackAuthConfigured };
