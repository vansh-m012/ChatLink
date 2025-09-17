
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//  "/images/profile.png" => string
//image? => image agar defined hua then string hoga
function UserAvatar( {name, image} : {name:string, image?  :string}) {   
  return (

    <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>

  )
}

export default UserAvatar