
import { dodopayments } from "@/lib/dodopayment";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    
    console.log("Creating payment for product:", productId);
    
    const productWithQuantity = {product_id: productId as string, quantity: 1}

    const response = await dodopayments.payments.create({
      // Using dummy data for local testing
      billing: {
            city: "Test City", 
            country: "US",
            state: "CA",
            street: "123 Test Street",
            zipcode: "12345",
          },
          customer: {
            email: "test@example.com",
            name: "Test User",
          },
          payment_link: true,
          product_cart: [productWithQuantity],
          return_url: process.env.NEXT_PUBLIC_BASE_URL,
    });
    
    console.log("Payment response:", response);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}