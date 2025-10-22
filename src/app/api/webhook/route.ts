import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { dodopayments } from "@/lib/dodopayment";
import { db } from "@/lib";
import { eq } from "drizzle-orm";
import { oneTimePayments, users } from "@/lib/db/schema";
import { PRODUCT_PLANS } from "../checkout/onetime/route";


const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY!);


export async function POST(request: Request) {
  const headersList =  await headers();

  try {
    const rawBody = await request.text();
    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };
    await webhook.verify(rawBody, webhookHeaders);
    const payload = JSON.parse(rawBody);

    if (payload.data.payload_type === "Subscription") {
      switch (payload.type) {
        case "subscription.active":
          const subscription = await dodopayments.subscriptions.retrieve(payload.data.subscription_id);
          // console.log("-------SUBSCRIPTION DATA START ---------")
          // console.log(subscription)
          // console.log("-------SUBSCRIPTION DATA END ---------")
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
              const paymentDataResp = await dodopayments.payments.retrieve(payload.data.payment_id)
              // console.log("-------PAYMENT DATA START ---------")
              // console.log(paymentDataResp)
              // console.log("-------PAYMENT DATA END ---------")
              await handlePaymentSucceeded(paymentDataResp);
              break;

              case "payment.failed":
                console.log('Payment failed' ,payload.data.payment_id);
                await handlePaymentFailed(payload.data.payment_id)
                break;
            default:
                console.log("Unhandled payment event:", payload.type);
                break;
        }
    }
    return Response.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(" ----- webhoook verification failed -----")
    console.log(error)
    return Response.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  }
}



async function handlePaymentSucceeded(paymentData : any) {
  try {
    
    console.log('Processding succesful payment');

    const user = await db.query.users.findFirst({
      where : eq(users.email , paymentData.customer.email)
    })
     if (!user) {
      console.error("User not found for payment:", paymentData.customer.email);
      return;
    }


    const planDetails = PRODUCT_PLANS[paymentData.product.id];
    if (!planDetails) {
      console.error("Unknown product ID:", paymentData.product.id);
      return;
    }


    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + planDetails.durationInDays);


    await db.insert(oneTimePayments).values({
      user_id: user.id,
      dodo_payment_id: paymentData.id,
      dodo_customer_id: paymentData.customer.id,
      product_id: paymentData.product.id,
      plan_name: planDetails.name,
      plan_duration: planDetails.duration,
      amount: paymentData.amount,
      currency: paymentData.currency || "USD",
      status: "succeeded",
      customer_email: paymentData.customer.email,
      customer_name: paymentData.customer.name || user.userName || "",
      expires_at: expiresAt,
    });


    await db.update(users)
      .set({ 
        subscribedUser: true, 
        updated_at: new Date() 
      })
      .where(eq(users.id, user.id));

    console.log(`Payment processed successfully for user: ${user.email}`);

  } catch (error) {
    console.error("Error handling while payment succeeded :", error)
  }
}


async function handlePaymentFailed(paymentId: string) {
  try {
    console.log("Processing failed payment:", paymentId);
  
  } catch (error) {
    console.error("Error handling payment failed:", error);
  }
}