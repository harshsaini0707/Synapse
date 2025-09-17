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
    <div>
      <button className='bg-blue-600 rounded-4xl' onClick={()=> signIn("google")} >Signin with google</button>
    </div>
  )
}

export default Signin