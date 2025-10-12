"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  product_id: number | string;
  name: string;
  description: string;
  price: number;
  is_recurring: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const checkoutProduct = async (productId: number | string, is_recurring: boolean, useDynamicPaymentLinks: boolean) => {
    setLoading(true);
    try {
      if (useDynamicPaymentLinks) {
        let productType = "onetime"
        if (is_recurring) {
          productType = "subscription"
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout/${productType}?productId=${productId}`, {
          cache: "no-store",
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        if (data.payment_link) {
          router.push(data.payment_link);
        } else {
          throw new Error("No payment link received");
        }
      } else {
        let checkoutUrl = `https://test.checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=${process.env.NEXT_PUBLIC_BASE_URL}`
        router.push(checkoutUrl)
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:transform hover:scale-105 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold text-black">{product.name}</h2>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-green-600 font-semibold mt-4">${product.price / 100}</p>
      <button
        className="text-xl font-bold bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
        onClick={() => checkoutProduct(product.product_id, product.is_recurring, true)}
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy now"}
      </button>
    </div>
  );
}