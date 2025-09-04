"use client"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

const Signin = () => {
  const {data :  session } = useSession();
  const router = useRouter();
  if(session){
    router.push('/dashboard');
  }
  return (
    <div>
      <button onClick={()=> signIn("google")} >Signin wiht google</button>
    </div>
  )
}

export default Signin