"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const DashBoard = () => {
    const{data : session  , status ,  update} =  useSession();

    console.log("data");
    console.log(session?.user);


    console.log("----staurs");
    console.log(status);


    console.log('sfsg');
    console.log(update);
    
    
    
    
    
    
  return (
    <div>DashBoard</div>
  )
}

export default DashBoard