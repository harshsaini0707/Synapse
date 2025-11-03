import { db } from "@/lib";
import { users, oneTimePayments, videos } from "@/lib/db/schema";
import { eq, and, gte, count } from "drizzle-orm";

export interface UserAccessStatus {
  canCreateVideo: boolean;
  isPremium: boolean;
  hasUsedTrial: boolean;
  trialVideosCount: number;
  reason?: string;
  isNewUser: boolean;
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
        hasUsedTrial: false,
        trialVideosCount: 0,
        reason: "User not found",
        isNewUser: false,
        hasFreeAccess: false
      };
    }

    // Check if user has free access granted
    if (user.is_free_access) {
      return {
        canCreateVideo: true,
        isPremium: false,
        hasUsedTrial: user.has_user_trial || false,
        trialVideosCount: user.trial_videos_created || 0,
        isNewUser: false,
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
        hasUsedTrial: user.has_user_trial || false,
        trialVideosCount: user.trial_videos_created || 0,
        isNewUser: false,
        hasFreeAccess: false
      };
    }

    // Check how many videos user has created
    const videoCount = await db.select({ count: count() })
      .from(videos)
      .where(eq(videos.user_id, userId));

    const userVideoCount = videoCount[0]?.count || 0;

    
    const hasUsedTrial = user.has_user_trial || false;

    // If user is new (no videos created) and hasn't used trial, allow one free video
    if (userVideoCount === 0 && !hasUsedTrial) {
      return {
        canCreateVideo: true,
        isPremium: false,
        hasUsedTrial: false,
        trialVideosCount: userVideoCount,
        isNewUser: true,
        hasFreeAccess: false
      };
    }

    // User has used trial or created videos, need premium
    return {
      canCreateVideo: false,
      isPremium: false,
      hasUsedTrial: true,
      trialVideosCount: userVideoCount,
      reason: "Trial used. Premium subscription required to continue creating videos.",
      isNewUser: false,
      hasFreeAccess: false
    };

  } catch (error) {
    console.error("Error checking user access:", error);
    return {
      canCreateVideo: false,
      isPremium: false,
      hasUsedTrial: false,
      trialVideosCount: 0,
      reason: "Error checking access",
      isNewUser: false,
      hasFreeAccess: false
    };
  }
}

export async function updateTrialUsage(userId: string) {
  try {
    await db.update(users)
      .set({ 
        has_user_trial: true,
        trial_videos_created: 1,
        updated_at: new Date() 
      })
      .where(eq(users.id, userId));
      
    console.log(`Trial usage updated for user: ${userId}`);
  } catch (error) {
    console.error("Error updating trial usage:", error);
  }
}