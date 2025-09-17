// this is used to show the faceCards of the user on the "/dashboard".
"use client"

import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import UserAvatar from '../common/UserAvatar'

// use of dynamic => makes that component(here logoutModal) lazy loaded, so that it does not goes with the initial bundle.
//If we don't write dynamic => All component code, bundle me include ho jata hai page load ke time. 06/09/2025 whatsup
import dynamic from "next/dynamic";
const LogoutModal = dynamic(() => import("../auth/logoutModal"));


function profileMenu( {name, image} : {name:string, image?  :string} ) {

  const [logoutOpen, setLogoutOpen]= useState(false);

  return (

    <>

    {/* profile menu ke andar (logout_button/logoutModal) hai, wo (show/pop) hoga jb logoutOpen=true hoga */}
     {logoutOpen && <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} />}

     <DropdownMenu>
        <DropdownMenuTrigger> 

            <UserAvatar name={name} image={image} />

        </DropdownMenuTrigger>

        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Profile</DropdownMenuItem>

            <DropdownMenuItem onClick={() => setLogoutOpen(true)}>Logout</DropdownMenuItem>

        </DropdownMenuContent>
        
        </DropdownMenu>
    </>
    
  )
}

export default profileMenu