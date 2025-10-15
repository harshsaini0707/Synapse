'use client'
import React from 'react'

import {Rocket , Flame , Target , Lock, RotateCcw, Zap, Crosshair, Mail, HelpCircle , Infinity } from "lucide-react"

const Premiumplan = () => {
  const plans = [
    {
      product_id: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_MONTHLY!, // Monthly plan
      name: "Monthly Plan",
      icon: Flame,
      description: "Perfect for regular learning",
      duration: "1 Month",
      price: 1000, // $10.00 in cents
      priceINR: 899, // ₹899
      originalPrice: null,
      isPopular: true,
      savings: null,
      badge: "MOST POPULAR"
    },
    {
      product_id: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_YEARLY!, // Yearly plan
      name: "Yearly Plan",
      icon: Infinity,
      description: "Best value for serious learners",
      duration: "12 Months",
      price: 8400, // $84.00 in cents
      priceINR: 7499, // ₹7,499
      originalPrice: 12000, // $120.00 (12 × $10.00)
      originalPriceINR: 10788, // ₹10,788 (12 × ₹899)
      isPopular: false,
      savings: "Save 30%",
      badge: "BEST VALUE"
    }
  ];

  // All features included in every plan
  const allFeatures = [
    "Unlimited video learning",
    "Advanced AI chatbot",
    "Discussion & counter-arguments",
    "Unlimited flashcards",
    "Quiz system (all types)",
    "Video timestamps & highlights",
    "Custom quiz creation",
    "Unlimited chat with video",
    "All type of summaries",
    "All new upcoming features"
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Emerald Void Background - Same as Home */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 70% 90%, #000000 40%, #072607 100%)",
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 py-12">
        <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-5xl poppins-bold text-neutral-200 mb-4 [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]'>
           All Features Included
          </h1>
          <p className='text-md text-gray-300 leading-snug quicksand-medium mb-8'>
            Choose your duration - Every plan includes our complete AI learning suite
          </p>
          <div className="inline-flex items-center gap-2 bg-lime-500/20 text-lime-300 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">✨ No Feature Restrictions - Full Access Always</span>
          </div>
        </div>

        {/* Feature List - Show once for all plans */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-lime-400 text-center mb-6 flex items-center justify-center gap-3">
            <Rocket className="w-8 h-8 text-lime-400" />
            What You Get With Every Plan:
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {allFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-gray-300">
                <span className="text-lime-400 text-sm mt-1">✓</span>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {plans.map((plan, index) => (
            <div 
              key={plan.product_id}
              className={`relative bg-white/10 backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl ${
                plan.isPopular 
                  ? 'border-lime-400 ring-2 ring-lime-400/50 bg-white/15 scale-105' 
                  : 'border-white/20 hover:border-lime-400/50'
              }`}
            >
              {/* Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className={`px-4 py-1 rounded-full text-sm font-bold ${
                  plan.isPopular 
                    ? 'bg-lime-400 text-black' 
                    : plan.savings 
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}>
                  {plan.badge}
                </div>
              </div>

              {/* Savings Badge */}
              {plan.savings && (
                <div className="absolute -top-3 -right-3">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {plan.savings}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 mt-4">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <plan.icon className={`w-8 h-8 ${
                    plan.isPopular ? 'text-lime-400' : 'text-gray-300'
                  }`} />
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">{plan.description}</p>
                
                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-neutral-50">
                      ${(plan.price / 100).toFixed(0)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm">/ {plan.duration}</span>
                      <span className="text-gray-300 text-xs">₹{plan.priceINR}</span>
                    </div>
                  </div>
                
                  {plan.duration === "12 Months" && (
                    <div className="text-lime-300 text-sm mt-2 font-semibold">
                      Only ${(plan.price / 12 / 100).toFixed(0)} /month
                    </div>
                  )}
                  {plan.savings && (
                    <div className="text-green-400 text-sm mt-2 font-semibold">
                      🎉 2 months free!
                    </div>
                  )}
                </div>
              </div>

              {/* Simple Feature Summary */}
              <div className="text-center mb-8">
                <div className="bg-lime-500/20 text-lime-300 px-4 py-3 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Infinity className="w-5 h-5 text-lime-400" />
                    <span className="text-lg font-bold">ALL FEATURES INCLUDED</span>
                  </div>
                  <p className="text-sm">Complete AI learning suite for {plan.duration}</p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={async () => {
                  try {
                    // Call your API to get the checkout URL
                    const response = await fetch(`/api/checkout/onetime?productId=${plan.product_id}`);
                    const data = await response.json();
                    if (data.checkout_url) {
                      window.location.href = data.checkout_url;
                    } else {
                      console.error('Failed to get checkout URL:', data.error);
                      alert('Failed to initiate checkout. Please try again.');
                    }
                  } catch (error) {
                    console.error('Checkout error:', error);
                    alert('Failed to initiate checkout. Please try again.');
                  }
                }}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 cursor-pointer ${
                  plan.isPopular
                    ? 'bg-lime-400 text-black hover:bg-lime-300 shadow-lg hover:shadow-lime-400/25'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                }`}
              >
                {index === 0 ? 'Get Monthly Access' : 'Get Yearly Access'}
              </button>

              {/* Per month calculation for longer plans */}
              {plan.duration === "12 Months" && (
                <div className="text-center mt-3 text-gray-300 text-xs">
                  Equivalent to $7.00/month (Save 30%)
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="flex justify-center items-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-blue-400" />
              <span>Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Instant Full Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-lime-400" />
              <span>No Feature Limits</span>
            </div>
          </div>
        </div>

        {/* Help & Refund Section */}
        <div className="text-center mt-16 mb-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-lime-400" />
              <h3 className="text-2xl font-bold text-white">Need Help or Refund?</h3>
            </div>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We're here to help! If you have any questions, need assistance, or want to request a refund, 
              don't hesitate to reach out to our support team.
            </p>
            
            <div className="flex items-center justify-center gap-3 bg-lime-500/10 border border-lime-500/20 rounded-lg p-4">
              <Mail className="w-6 h-6 text-lime-400" />
              <div className="text-left">
                <p className="text-sm text-gray-400 mb-1">Contact Support:</p>
                <a 
                  href="mailto:harshsaini0172@gmail.com?subject=Synapse AI Support Request"
                  className="text-lime-400 hover:text-lime-300 font-semibold text-lg transition-colors duration-200"
                >
                  harshsaini0172@gmail.com
                </a>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm mt-4">
              We typically respond within 24 hours. Please include your order details for faster assistance.
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Premiumplan