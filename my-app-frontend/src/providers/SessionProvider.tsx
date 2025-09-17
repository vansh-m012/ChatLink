"use client"
import React from 'react'
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";


function SessionProvider( {children} : {children : React.ReactNode} ) {
  return (
     <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
  )
}

export default SessionProvider