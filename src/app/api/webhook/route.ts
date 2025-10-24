import { Webhook } from "standardwebhooks";
import { NextResponse } from "next/server";
import { dodopayments } from "@/lib/dodopayment";
import { db } from "@/lib";
import { eq } from "drizzle-orm";
import { oneTimePayments, users } from "@/lib/db/schema";
import { PRODUCT_PLANS } from "../checkout/onetime/route";


const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY! || "");



export async function POST(request: Request) {
  try {
    // Use request.headers directly (more reliable in edge runtime)
    const reqHeaders = request.headers;
    
    // Debug logging
    console.log("=== Webhook received ===");
    console.log("Headers:", Object.fromEntries(reqHeaders.entries()));

    const rawBody = await request.text();
    console.log("Raw body (truncated):", rawBody.slice(0, 500));

    const webhookHeaders = {
      "webhook-id": reqHeaders.get("webhook-id") || reqHeaders.get("x-webhook-id") || "",
      "webhook-signature": reqHeaders.get("webhook-signature") || reqHeaders.get("x-webhook-signature") || "",
      "webhook-timestamp": reqHeaders.get("webhook-timestamp") || reqHeaders.get("x-webhook-timestamp") || "",
    };

    // Check if webhook key is configured
    if (!process.env.DODO_PAYMENTS_WEBHOOK_KEY) {
      console.error("DODO_PAYMENTS_WEBHOOK_KEY is not set");
      return NextResponse.json({ error: "Webhook key not configured" }, { status: 500 });
    }

    // Verify webhook signature
    console.log("Verifying webhook signature...");
    await webhook.verify(rawBody, webhookHeaders);
    console.log("Signature verified successfully");
    
    const payload = JSON.parse(rawBody);

    if (payload.data.payload_type === "Subscription") {
      switch (payload.type) {
        case "subscription.active":
          const subscription = await dodopayments.subscriptions.retrieve(payload.data.subscription_id);
          break;
        case "subscription.failed":
          break;
        case "subscription.cancelled":
          break;
        case "subscription.renewed":
          break;
        case "subscription.on_hold":
          break
        default:
          break;
      }
    } else if (payload.data.payload_type === "Payment") {
        switch (payload.type) {
            case "payment.succeeded":
              console.log('Payment succeeded event received');
              console.log('Payment ID:', payload.data.payment_id);
              
              try {
                // Try to retrieve full payment data from Dodo API
                const paymentDataResp = await dodopayments.payments.retrieve(payload.data.payment_id);
                console.log('Payment data retrieved successfully from Dodo API');
                await handlePaymentSucceeded(paymentDataResp);
              } catch (apiError: any) {
                console.error('Failed to retrieve payment from Dodo API:', apiError.message);
                console.log('Using webhook payload data directly instead');
                // If API call fails, use the webhook payload data directly
                await handlePaymentSucceeded(payload.data , payload.data.payment_id);
              }
              break;

              case "payment.failed":
                console.log('Payment failed', payload.data.payment_id);
                await handlePaymentFailed(payload.data.payment_id)
                break;
            default:
                console.log("Unhandled payment event:", payload.type);
                break;
        }
    }
    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("=== Webhook error ===");
    console.error("Error:", error?.message || error);
    console.error("Stack:", error?.stack);
    
  
    return NextResponse.json(
      { error: error?.message || "Webhook processing error" },
      { status : 200 }
    );
  }
}



async function handlePaymentSucceeded(paymentData : any ,  payment_id ?: any) {
  try {
    
    console.log('Processing successful payment...');
    console.log(paymentData);
    
    console.log('Payment ID:', paymentData?.payment_id || paymentData.id || payment_id);
    console.log('Customer email:', paymentData.customer?.email);

    // Find user by email with better error handling
    let user;
    try {
      user = await db.query.users.findFirst({
        where : eq(users.email , paymentData.customer.email)
      });
    } catch (dbError: any) {
      console.error("Database error while finding user:", dbError.message);
      throw new Error(`Database connection failed: ${dbError.message}`);
    }

     if (!user) {
      console.error("User not found for payment:", paymentData.customer.email);
      return;
    }
    
    console.log('User found:', user.id);
    // Safely extract product id - Dodo may send it under product, product_cart, or product_id
    const productId = paymentData?.product?.id || paymentData?.product_id || paymentData?.product_cart?.[0]?.product_id;
    if (!productId) {
      console.error("No product id found in payment payload:", paymentData);
      return;
    }
    
    // Extract payment ID safely
    const paymentId = paymentData.payment_id || paymentData.id || payment_id;
    if (!paymentId) {
      console.error("No payment ID found in payload");
      return;
    }

    const planDetails = PRODUCT_PLANS[productId];
    if (!planDetails) {
      console.error("Unknown product ID:", productId);
      console.error("Available product IDs:", Object.keys(PRODUCT_PLANS));
      // Still store a minimal payment record and exit
      const fallbackExpires = new Date();
      fallbackExpires.setDate(fallbackExpires.getDate() + 30);

      try {
        await db.insert(oneTimePayments).values({
          user_id: user.id,
          dodo_payment_id: paymentId,
          dodo_customer_id: paymentData.customer?.customer_id || paymentData.customer?.id || null,
          product_id: productId,
          plan_name: paymentData.product?.name || "Unknown Plan",
          plan_duration: "30 days",
          amount: paymentData.total_amount || paymentData.amount || 0,
          currency: paymentData.currency || paymentData.settlement_currency || "USD",
          status: paymentData.status || "succeeded",
          customer_email: paymentData.customer?.email,
          customer_name: paymentData.customer?.name || user.userName || "",
          expires_at: fallbackExpires,
        });
        console.log("Stored fallback payment record successfully");
      } catch (dbError: any) {
        console.error("Failed to insert fallback payment:", dbError.message);
        throw dbError;
      }

      console.warn("Stored fallback payment record for unknown plan and exiting processing.");
      return;
    }

    console.log('Plan found:', planDetails.name);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + planDetails.durationInDays);

    try {
      await db.insert(oneTimePayments).values({
        user_id: user.id,
        dodo_payment_id: paymentId,
        dodo_customer_id: paymentData.customer?.customer_id || paymentData.customer?.id || null,
        product_id: productId,
        plan_name: planDetails.name,
        plan_duration: planDetails.duration,
        amount: paymentData.total_amount || paymentData.amount || 0,
        currency: paymentData.currency || paymentData.settlement_currency || "USD",
        status: paymentData.status || "succeeded",
        customer_email: paymentData.customer?.email,
        customer_name: paymentData.customer?.name || user.userName || "",
        expires_at: expiresAt,
      });
      console.log('Payment record inserted successfully');
    } catch (dbError: any) {
      console.error("Failed to insert payment record:", dbError.message);
      throw dbError;
    }


    try {
      await db.update(users)
        .set({ 
          subscribedUser: true, 
          updated_at: new Date() 
        })
        .where(eq(users.id, user.id));
      console.log('User subscription status updated successfully');
    } catch (dbError: any) {
      console.error("Failed to update user subscription:", dbError.message);
      throw dbError;
    }

    console.log(`Payment processed successfully for user: ${user.email}`);

  } catch (error: any) {
    console.error("Error handling payment succeeded:", error.message);
    console.error("Error stack:", error.stack);
    // Re-throw to be caught by main handler
    throw error;
  }
}


async function handlePaymentFailed(paymentId: string) {
  try {
    console.log("Processing failed payment:", paymentId);
  
  } catch (error) {
    console.error("Error handling payment failed:", error);
  }
}