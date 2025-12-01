import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/lib/auth/stack";
import { notFound } from "next/navigation";

export default function Handler(props: { params: Promise<{ stack: string[] }> }) {
  // If Stack Auth is not configured, return 404
  if (!stackServerApp) {
    notFound();
  }

  return <StackHandler fullPage app={stackServerApp} params={props.params} />;
}
