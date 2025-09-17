import React, { Dispatch, SetStateAction } from 'react'


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,

} from "@/components/ui/alert-dialog"

import { signOut } from 'next-auth/react'
import { BoxIcon } from '@radix-ui/react-icons'


// const [state, setState] = useState<boolean>(false);

// state → type: boolean
// setState → type: Dispatch<SetStateAction<boolean>>  

function logoutModal({open, setOpen} : {open:boolean, setOpen: Dispatch<SetStateAction<boolean>>}) {
  
  const handleLogout = () => {

    signOut ( {
      redirect: true,
      callbackUrl: "/",

    })
  }

  
  return (

    // custom syntax of shadcn UI => open and onOpenChange
    // open= true => shows AlertDialog
    // open= false => hides AlertDialog so that it don't hangs like a ghost.
    <AlertDialog open={open} onOpenChange={setOpen}>
        
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your current
                session from device.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>

            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} > Continue </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    
  )
}

export default logoutModal