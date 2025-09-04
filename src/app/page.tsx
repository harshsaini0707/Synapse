"use client"
import {  useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

const LandingPage = () => {
  const {data :  session } = useSession();
  const router = useRouter();

  if(session){
    router.push('/dashboard');
  }
   return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Welcome to My App</h1>
      <p className="text-lg text-gray-600 mb-8">
        Connect with Google to continue.
      </p>

      <button
        onClick={()=>router.push('/signin')}
        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Sign in with Google
      </button>
    </main>
  );
}

export default LandingPage