"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function PaymentSuccess() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/home'); // Redirect to home or dashboard
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-lime-900 to-slate-900'>
      <div className='text-center p-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl mx-4'>
        {/* Success Animation */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className='text-4xl md:text-5xl quicksand-bold text-lime-400 mb-4 [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]'>
          🎉 Payment Successful!
        </h1>
        
        <p className='text-xl text-gray-300 leading-relaxed quicksand-medium mb-6'>
          Welcome to Premium, {session?.user?.name || 'User'}!
        </p>
        
        <div className="bg-white/20 rounded-lg p-6 mb-6">
          <h3 className="text-lime-400 font-bold text-lg mb-3">🚀 You now have access to:</h3>
          <ul className="text-gray-300 space-y-2">
            <li>✅ Unlimited Video Summaries</li>
            <li>✅ Advanced AI Chat Features</li>
            <li>✅ Flashcard Generation</li>
            <li>✅ Quiz Creation</li>
            <li>✅ Priority Support</li>
          </ul>
        </div>

        <div className="text-gray-400 mb-6">
          <p>Redirecting to your dashboard in {countdown} seconds...</p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push('/home')}
            className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => router.push('/premium')}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            View Plans
          </button>
        </div>
      </div>
    </div>
  );
}