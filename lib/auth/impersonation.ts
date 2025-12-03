import { cookies } from "next/headers";

const IMPERSONATION_COOKIE = "admin_impersonate_business";
const IMPERSONATION_MAX_AGE = 60 * 60; // 1 hour

export interface ImpersonationData {
  businessId: number;
  businessName: string;
  adminId: number;
  startedAt: string;
}

/**
 * Start impersonating a business (server action)
 */
export async function startImpersonation(
  adminId: number,
  businessId: number,
  businessName: string
): Promise<void> {
  const cookieStore = await cookies();

  const data: ImpersonationData = {
    businessId,
    businessName,
    adminId,
    startedAt: new Date().toISOString(),
  };

  cookieStore.set(IMPERSONATION_COOKIE, JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: IMPERSONATION_MAX_AGE,
    path: "/",
  });
}

/**
 * Stop impersonating a business (server action)
 */
export async function stopImpersonation(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(IMPERSONATION_COOKIE);
}

/**
 * Get current impersonation data if active
 */
export async function getImpersonation(): Promise<ImpersonationData | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(IMPERSONATION_COOKIE);

  if (!cookie?.value) {
    return null;
  }

  try {
    const data = JSON.parse(cookie.value) as ImpersonationData;

    // Check if impersonation has expired (max 1 hour)
    const startedAt = new Date(data.startedAt);
    const now = new Date();
    const elapsedMs = now.getTime() - startedAt.getTime();

    if (elapsedMs > IMPERSONATION_MAX_AGE * 1000) {
      await stopImpersonation();
      return null;
    }

    return data;
  } catch {
    // Invalid cookie data, clear it
    await stopImpersonation();
    return null;
  }
}

/**
 * Check if currently impersonating any business
 */
export async function isImpersonating(): Promise<boolean> {
  const data = await getImpersonation();
  return data !== null;
}

/**
 * Get the impersonated business ID if active
 */
export async function getImpersonatedBusinessId(): Promise<number | null> {
  const data = await getImpersonation();
  return data?.businessId ?? null;
}
