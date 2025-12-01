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
      afterSignIn: "/en",
      afterSignUp: "/en",
      signOut: "/handler/sign-out",
      afterSignOut: "/",
      accountSettings: "/handler/account-settings",
    },
  });
}

export const stackServerApp = createStackServerApp();
export { isStackAuthConfigured };
