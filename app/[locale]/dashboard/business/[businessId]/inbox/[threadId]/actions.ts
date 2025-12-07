"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessByIdForUser, sendMessage, updateThreadStatus, getThreadById } from "@/db/queries";
import { getBusinessById } from "@/db/queries/businesses";

/**
 * Server action to send a message from a business
 */
export async function sendMessageAction(formData: FormData) {
  const threadId = parseInt(formData.get("threadId") as string, 10);
  const businessId = formData.get("businessId") as string;
  const businessIdNum = parseInt(businessId, 10);
  const body = formData.get("body") as string;
  const locale = formData.get("locale") as string;

  if (!threadId || !body?.trim() || isNaN(businessIdNum)) {
    return { error: "Missing required fields" };
  }

  // Auth check
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    return { error: "User not found" };
  }

  // Verify business ownership (admin bypass)
  let business;
  if (dbUser.role === "admin") {
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({ businessId: businessIdNum, userId: dbUser.id });
  }

  if (!business) {
    return { error: "Business not found or access denied" };
  }

  // Verify thread belongs to this business
  const thread = await getThreadById(threadId);
  if (!thread || thread.businessId !== businessIdNum) {
    return { error: "Thread not found or access denied" };
  }

  const result = await sendMessage({
    threadId,
    senderType: "business",
    senderUserId: dbUser.id,
    body: body.trim(),
  });

  if (!result) {
    return { error: "Failed to send message" };
  }

  // Revalidate the thread page
  revalidatePath(`/${locale}/dashboard/business/${businessId}/inbox/${threadId}`);
  revalidatePath(`/${locale}/dashboard/business/${businessId}/inbox`);

  return { success: true };
}

/**
 * Server action to update thread status (archive, spam, reopen)
 */
export async function updateThreadStatusAction(formData: FormData): Promise<void> {
  const threadId = parseInt(formData.get("threadId") as string, 10);
  const businessId = formData.get("businessId") as string;
  const businessIdNum = parseInt(businessId, 10);
  const locale = formData.get("locale") as string;
  const status = formData.get("status") as "open" | "archived" | "spam";

  if (!threadId || !status || isNaN(businessIdNum)) {
    redirect(`/${locale}/dashboard/business/${businessId}/inbox?error=missing_fields`);
  }

  // Auth check
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) {
    redirect(`/${locale}/dashboard/business/${businessId}/inbox?error=unauthorized`);
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    redirect(`/${locale}/dashboard/business/${businessId}/inbox?error=unauthorized`);
  }

  // Verify business ownership (admin bypass)
  let business;
  if (dbUser.role === "admin") {
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({ businessId: businessIdNum, userId: dbUser.id });
  }

  if (!business) {
    redirect(`/${locale}/dashboard/business/${businessId}/inbox?error=access_denied`);
  }

  // Verify thread belongs to this business
  const thread = await getThreadById(threadId);
  if (!thread || thread.businessId !== businessIdNum) {
    redirect(`/${locale}/dashboard/business/${businessId}/inbox?error=thread_not_found`);
  }

  const result = await updateThreadStatus(threadId, status);

  if (!result) {
    redirect(`/${locale}/dashboard/business/${businessId}/inbox?error=update_failed`);
  }

  // Revalidate and redirect to inbox
  revalidatePath(`/${locale}/dashboard/business/${businessId}/inbox`);
  redirect(`/${locale}/dashboard/business/${businessId}/inbox?status=${status}`);
}
