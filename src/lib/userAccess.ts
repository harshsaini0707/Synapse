import { db } from "@/lib";
import { users, oneTimePayments, videos } from "@/lib/db/schema";
import { eq, and, gte, count } from "drizzle-orm";

export interface UserAccessStatus {
  canCreateVideo: boolean;
  isPremium: boolean;
  reason?: string;
  hasFreeAccess: boolean;
}

export async function checkUserAccess(userId: string): Promise<UserAccessStatus> {
  try {
    // Get user data
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return {
        canCreateVideo: false,
        isPremium: false,
        reason: "User not found",
        hasFreeAccess: false
      };
    }

    // Check if user has free access granted
    if (user.is_free_access) {
      return {
        canCreateVideo: true,
        isPremium: false,
        hasFreeAccess: true
      };
    }

    // Check if user has active premium subscription
    const activePayment = await db.query.oneTimePayments.findFirst({
      where: and(
        eq(oneTimePayments.user_id, userId),
        eq(oneTimePayments.status, "succeeded"),
        gte(oneTimePayments.expires_at, new Date())
      ),
      orderBy: (oneTimePayments, { desc }) => [desc(oneTimePayments.created_at)]
    });

    if (activePayment) {
      return {
        canCreateVideo: true,
        isPremium: true,
        hasFreeAccess: false
      };
    }

    // User needs premium subscription or free access to create videos
    return {
      canCreateVideo: false,
      isPremium: false,
      reason: "Premium subscription required to create videos.",
      hasFreeAccess: false
    };

  } catch (error) {
    console.error("Error checking user access:", error);
    return {
      canCreateVideo: false,
      isPremium: false,
      reason: "Error checking access",
      hasFreeAccess: false
    };
  }
}