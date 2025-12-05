"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendMessage, updateThreadStatus } from "@/db/queries";

/**
 * Server action to send a message from a business
 */
export async function sendMessageAction(formData: FormData) {
  const threadId = parseInt(formData.get("threadId") as string, 10);
  const businessId = formData.get("businessId") as string;
  const senderUserId = parseInt(formData.get("senderUserId") as string, 10);
  const body = formData.get("body") as string;
  const locale = formData.get("locale") as string;

  if (!threadId || !body?.trim()) {
    return { error: "Missing required fields" };
  }

  const result = await sendMessage({
    threadId,
    senderType: "business",
    senderUserId,
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
export async function updateThreadStatusAction(formData: FormData) {
  const threadId = parseInt(formData.get("threadId") as string, 10);
  const businessId = formData.get("businessId") as string;
  const locale = formData.get("locale") as string;
  const status = formData.get("status") as "open" | "archived" | "spam";

  if (!threadId || !status) {
    return { error: "Missing required fields" };
  }

  const result = await updateThreadStatus(threadId, status);

  if (!result) {
    return { error: "Failed to update thread status" };
  }

  // Revalidate and redirect to inbox
  revalidatePath(`/${locale}/dashboard/business/${businessId}/inbox`);
  redirect(`/${locale}/dashboard/business/${businessId}/inbox?status=${status}`);
}
