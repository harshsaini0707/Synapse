import React from 'react'
import ProductCard from '@/components/ProductCard'

const Premiumplan = () => {
  // Test product for dodo payment integration
  const testProduct = {
    product_id: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID!, // Replace with your actual test product ID from dodo
    name: "Premium Plan",
    description: "Access to all premium features",
    price: 999, // $9.99 in cents
    is_recurring: false
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-lime-900 to-slate-900'>  
      <div className='text-center p-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 max-w-4xl mx-4'>
        <h1 className='text-4xl md:text-6xl quicksand-bold text-lime-400 mb-4 [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]'>
          💰 Test Dodo Payment
        </h1>
        <p className='text-xl md:text-xl text-gray-300 leading-relaxed quicksand-medium mb-8'>
          Testing dodo payment integration locally
        </p>
        
        <div className="max-w-md mx-auto">
          <ProductCard product={testProduct} />
        </div>
        
        <div className="mt-8 text-sm text-gray-400">
          <p>This is a test payment. No actual charges will be made.</p>
          <p>Make sure to update the product_id with your actual dodo product ID.</p>
        </div>
      </div>
    </div>
  )
}

export default Premiumplan