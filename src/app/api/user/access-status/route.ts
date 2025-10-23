import { NextRequest, NextResponse } from "next/server";
import { checkUserAccess } from "@/lib/userAccess";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const accessStatus = await checkUserAccess(userId);
    
    return NextResponse.json({
      canCreateVideo: accessStatus.canCreateVideo,
      isPremium: accessStatus.isPremium,
      hasUsedTrial: accessStatus.hasUsedTrial,
      trialVideosCount: accessStatus.trialVideosCount,
      reason: accessStatus.reason,
      isNewUser: accessStatus.isNewUser
    });

  } catch (error) {
    console.error("Error checking premium status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}