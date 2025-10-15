"use client";
import { useState } from "react";

type Product = {
  product_id: number | string;
  name: string;
  description: string;
  price: number;
  is_recurring: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  const checkoutProduct = async (productId: number | string) => {
    setLoading(true);
    
    try {
      // Use Dodo's direct checkout - they handle the form
      const redirectUrl = `${window.location.origin}/premium/success`;
      const checkoutUrl = `https://test.checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=${encodeURIComponent(redirectUrl)}`;
      
      console.log("Redirecting to Dodo checkout:", checkoutUrl);
      
      
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Unable to start checkout. Please try again.");
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
        onClick={() => checkoutProduct(product.product_id)}
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Buy now"}
      </button>
    </div>
  );
}