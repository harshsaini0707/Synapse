"use client"
import { UserState, useUserStore } from '@/store/userStore';
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

const Signin = () => {
  const {data :  session } = useSession();
  const router = useRouter();
  const setUser = useUserStore((state  : UserState)=>state.setUser);
  if(session){

  router.push('/home');

  setUser({
  id :  session?.user?.id || " ",
  name :  session?.user?.name || " " ,
  email : session?.user?.email || " ",
  image : session?.user?.image || ""
  })

   
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm p-6 border-2 border-gray-700 rounded-lg shadow-[4px_4px_0_#374151] flex flex-col items-start justify-center gap-4 w-full max-w-sm">
        <p className="text-gray-800 font-bold text-xl mb-4 flex flex-col">
          Welcome to Synapse
          <span className="text-gray-600 font-semibold text-base">sign in to continue</span>
        </p>
        
        <button 
          onClick={() => signIn("google")}
          className="flex justify-center items-center gap-3 w-full h-12 rounded-lg border-2 border-gray-700 bg-white shadow-[4px_4px_0_#374151] text-base font-semibold text-gray-800 cursor-pointer transition-all duration-300 relative overflow-hidden z-[1] group hover:text-white hover:border-lime-500"
        >
          <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-lime-400 to-lime-500 z-[-1] shadow-[4px_8px_19px_-3px_rgba(132,204,22,0.3)] transition-all duration-300 group-hover:w-full" />
          <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          <span className="relative z-10">Continue with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Signin