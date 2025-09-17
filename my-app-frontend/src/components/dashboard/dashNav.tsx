"use client";

import React from "react";
import Link from "next/link";
// import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";
import LoginModal from "../auth/loginModal";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import ProfileMenu from "../auth/profileMenu";



function dashNav( {name, image} : {name:string, image?  :string}  ) {
  return (

    <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
      <h1 className="text-xl md:text-2xl font-extrabold">QuickChat</h1>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
       
          {/* component name must be capital so that react knows it is a React component not a html tag  */}
          <ProfileMenu name={name}  image={image} ></ProfileMenu> 

      </div>
    </nav>
  )
}

export default dashNav