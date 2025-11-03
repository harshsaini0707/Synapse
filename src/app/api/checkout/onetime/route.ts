import { NextResponse } from "next/server";

// Determine if we should use live mode
const useLiveMode = process.env.NODE_ENV === "production" && process.env.DODO_USE_LIVE_MODE === "true";

export const PRODUCT_PLANS = {
  // Use live or test product IDs based on mode
  [ process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_MONTHLY!]: {
    name: "Monthly Plan", 
    duration: "1 Month",
    price: "$10",
    durationInDays: 30,
    features: "All features included"
  },
  [process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_YEARLY!]: {
    name: "Yearly Plan",
    duration: "12 Months",
    durationInDays: 365, 
    price: "$84",
    features: "All features included"
  }
};

// Simple API route that returns direct checkout URL
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Validate product ID
    const planDetails = PRODUCT_PLANS[productId];
    if (!planDetails) {
      console.error("Invalid product ID:", productId);
      console.error("Available product IDs:", Object.keys(PRODUCT_PLANS));
      console.error("Mode:", useLiveMode ? "LIVE" : "TEST");
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }
    
    console.log(`[${useLiveMode ? "LIVE" : "TEST"}] Creating checkout URL for ${planDetails.name} (${planDetails.duration}) - ${planDetails.price}`);
    console.log("Product ID:", productId);
    
    // Create direct Dodo checkout URL - use correct domain based on mode
    const checkoutDomain = useLiveMode 
      ? "https://checkout.dodopayments.com" 
      : "https://test.checkout.dodopayments.com";
    
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/premium/success`;
    const checkoutUrl = `${checkoutDomain}/buy/${productId}?quantity=1&redirect_url=${encodeURIComponent(redirectUrl)}`;
    
    console.log("Generated checkout URL:", checkoutUrl);
    console.log("Redirect URL:", redirectUrl);
    
    return NextResponse.json({ 
      checkout_url: checkoutUrl,
      message: "Redirect to Dodo checkout page",
      plan_details: planDetails,
      mode: useLiveMode ? "live" : "test"
    });
    
  } catch (error) {
    console.error("Checkout URL creation error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout URL" },
      { status: 500 }
    );
  }
}

// Keep POST method for future custom form usage if needed
// export async function POST(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const productId = searchParams.get("productId");
    
//     if (!productId) {
//       return NextResponse.json(
//         { error: "Product ID is required" },
//         { status: 400 }
//       );
//     }

//     // Validate product ID
//     const planDetails = PRODUCT_PLANS[productId];
//     if (!planDetails) {
//       console.error("Invalid product ID:", productId);
//       return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
//     }
    
//     // Get user data from request body
//     const body = await request.json();
//     const { customer, billing } = body;
    
//     console.log(`Creating payment for ${planDetails.name} (${planDetails.duration}) - ${planDetails.price}`);
//     console.log("Product ID:", productId);
//     console.log("Customer info:", customer);
//     console.log("Billing info:", billing);
    
//     // For now, redirect to direct checkout even for POST
//     const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/premium/success`;
//     const checkoutUrl = `https://test.checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=${encodeURIComponent(redirectUrl)}`;
    
//     return NextResponse.json({ 
//       checkout_url: checkoutUrl,
//       message: "Using Dodo's checkout form",
//       plan_details: planDetails
//     });
    
//   } catch (error) {
//     console.error("Payment creation error:", error);
//     return NextResponse.json(
//       { error: "Failed to create payment", details: error instanceof Error ? error.message : "Unknown error" },
//       { status: 500 }
//     );
//   }
// }