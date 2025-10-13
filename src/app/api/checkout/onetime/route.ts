import { NextResponse } from "next/server";

// Simple API route that returns direct checkout URL
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    
    console.log("Creating direct checkout URL for product:", productId);
    
    // Create direct Dodo checkout URL - they handle the form
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/premium/success`;
    const checkoutUrl = `https://test.checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=${encodeURIComponent(redirectUrl)}`;
    
    return NextResponse.json({ 
      checkout_url: checkoutUrl,
      message: "Redirect to Dodo checkout page"
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
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }
    
    // Get user data from request body
    const body = await request.json();
    const { customer, billing } = body;
    
    console.log("Creating payment for product:", productId);
    console.log("Customer info:", customer);
    console.log("Billing info:", billing);
    
    // For now, redirect to direct checkout even for POST
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/premium/success`;
    const checkoutUrl = `https://test.checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=${encodeURIComponent(redirectUrl)}`;
    
    return NextResponse.json({ 
      checkout_url: checkoutUrl,
      message: "Using Dodo's checkout form"
    });
    
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}