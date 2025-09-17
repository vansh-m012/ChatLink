"use client"  // telling nextJs this is a client component explicitly, bcz nextjs renders everything on server implicitly.
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



function loginModal() {

  const handleLogin = () => {
      signIn("google", {
      redirect: true,
      callbackUrl: "/dashboard",
    });
  }


  
  return (
    <Dialog>
  <DialogTrigger asChild> 
    <Button> Getting Start</Button> 
  </DialogTrigger>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-2xl'>Welcome to quickChat</DialogTitle>
      <DialogDescription>
        quickChat makes it effortless to create secure chat rooms and start conversations in seconds.
      </DialogDescription>
    </DialogHeader>

     <Button variant="outline" onClick={handleLogin} >
          <Image
            src="/images/google.png"
            className=" mr-4"
            width={25}
            height={25}
            alt="google"
          />
          Continue with Google
        </Button>

  </DialogContent>
</Dialog>

 
  );
}

export default loginModal

