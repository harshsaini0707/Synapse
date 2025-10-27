"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

export default function PaymentSuccess() {
  const [countdown, setCountdown] = useState(5);
  const userName   = useUserStore((state) => state?.user?.name)
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className='min-h-screen w-full relative'>
      {/* Emerald Void Background - matching theme */}
      <div className="absolute inset-0 z-0 emerald-void-bg" />
      
      {/* Main Content */}
      <div className='min-h-screen flex items-center justify-center relative z-10 px-4'>
        <div className='text-center p-6 rounded-xl bg-black/50 backdrop-blur-md border border-gray-800 max-w-sm mx-4 shadow-xl'>
          {/* Success Icon */}
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-lime-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-lime-400/30 animate-bounce">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className='text-2xl poppins-bold text-gray-200 mb-2'>
            Payment Successful!
          </h1>
          
          {/* Subtitle */}
          <p className='text-sm text-gray-400 poppins-regular mb-4'>
            Welcome to Premium, {userName || 'User'}
          </p>
          
          {/* Countdown */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <p className='text-gray-400 poppins-regular text-sm'>Redirecting in</p>
            <span className="text-sm poppins-semibold text-blue-400 animate-pulse">
              {countdown}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={() => router.push('/home')}
            className="w-full bg-gray-300 hover:bg-gray-400 text-black poppins-semibold py-2.5 px-6 rounded-lg transition-all duration-300 shadow-md text-sm transform hover:scale-105 active:scale-95"
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}