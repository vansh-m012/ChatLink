"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import createChatSchema, {createChatSchemaType } from '@/validations/groupChatValidation'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { CHAT_GROUP_URL } from '@/lib/apiEndPoints'
import { clearCache } from '@/actions/common'



function CreateChat( {user} : {user: CustomUser}) {

  const [open, setOpen]= useState(false);
  const [loading, setLoading] = useState(false);



  // syntax from step2 => https://react-hook-form.com/get-started#SchemaValidation
  //**IMP// useForm giving 3 things (register, handleSubmit, formState) as well as doing validation with the help of zod resolver.
  const { register, handleSubmit, formState: { errors }} = useForm<createChatSchemaType> ({

      resolver: zodResolver(createChatSchema),

  })

  const x= async (payload : createChatSchemaType) => {

    // title, passcode is the payload.
    console.log("The chatGroup payload is", payload);

    try{

        // The payload( title, passcode) submit click hone ke baad backend ke paas jaa rha so uss time ke liye user firse submit na dba de isley button hide kr denge)
        setLoading(true);

        // axios.post( url, data, config=> authorization comes in this)
        const {data}= await axios.post(CHAT_GROUP_URL, {...payload, user_id: user.id}, {
            headers: {
              authorization: user.token
            }
        }
        );

        if(data?.message){
          clearCache("dashboard");
          setLoading(false);
          setOpen(false);
          toast.success(data?.message);
        }


    }
    catch(error){
        setLoading(false);

        if(error instanceof AxiosError ){
            toast.error(error.message);
        }
        else{
          toast.error("Something went wrong. Please try again !");
        }

    }

  }


  return (
    <Dialog open={open} onOpenChange={setOpen} >

        {/* by writing asChild DialogTrigger not renders in own DOM element, DialogTrigger will now render its child element. */}
        <DialogTrigger asChild>
            <Button> Create Group </Button>
        </DialogTrigger>

        <DialogContent  onInteractOutside={ (e) => e.preventDefault()}>
            <DialogHeader>
                <DialogTitle> Create your new chat </DialogTitle>
            </DialogHeader>

            {/* providing validation through react-hook-form & zod (# react-hook-form/get-started/ schema validation documentation) */}
            {/* This is validation through frontend, same thing can be done through backend as well */}

             {/* if handleSubmit finds payload is valid then only it calls the function x else setForm error; camera 8 sept => internal implementation */}
            <form onSubmit={handleSubmit(x)}>  

                <div className="mt-4">
                  <Input placeholder="Enter chat title" {...register("title")} />
                  <span className="text-red-400">{errors?.title?.message}</span>
                </div>

                <div className="mt-4">
                  <Input placeholder="Enter passcode" {...register("passcode")} />
                  <span className="text-red-400">{errors?.passcode?.message}</span>
                </div>


                {/* if loading==true, disable/hide the button => # improves the user experience */}
                <Button className="w-full" disabled={loading}>
                  {loading ? "Processing.." : "Submit"}
                </Button>


            </form>

        </DialogContent>
    </Dialog>

  )
}

export default CreateChat