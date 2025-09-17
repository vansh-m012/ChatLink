"use client"
import { getSocket } from '@/lib/socket.config';
import React,{useEffect, useMemo, useState} from 'react'
import { v4 as uuidV4} from "uuid"
import { Button } from '../ui/button';
import ChatSidebar from './ChatSidebar';
import ChatNav from './ChatNav';
import ChatUserDialog from './ChatUserDialog';
import Chats from './Chats';

function ChatBase( {group, users, oldMessages} : { group: ChatGroupType, users: Array<GroupChatUserType>  | [], oldMessages: Array<MessageType> | [] } ) {


/*

  // memorization :- only do getSocket() for the first time, do not establish connection on each & every time when this ChatBase.tsx is rendered
    let socket= useMemo( () => {

        //(1) will get a socket instance from lib/socket.config.ts
        const socket= getSocket()      
        
        // socket.io HANDSHAKE (# sending headers to server)
        socket.auth= {
            room: groupId
        }

        //(2) establishing connection with server
        return socket.connect()

    }, [])


    useEffect( () => {

        //(3) # attaching listener on (mounting/first time rendering) = listening server's msg 
        socket.on("message", (data: any) => {
            console.log("the socket message is:- ", data )   // 4th time
        })

        // on un-mounting => whole socket closed instead of just listener.
        return () => {
            socket.close();
        }

    }, [])


    const handleClick= () => {

        //(4) client to server
        socket.emit("message", {name: "Vansh", id: uuidV4()} ) // 1st (C to S)

    }


*/

    const [open, setOpen]= useState(true);
    const [chatUser, setChatUser]= useState<GroupChatUserType>();

    useEffect( () => {
        const data= localStorage.getItem(group.id);
        if(data){
            const pData= JSON.parse(data);
            setChatUser(pData);
        }

    }, [group.id])

    return (
    
        <div className='flex'>
            <ChatSidebar users={users}/>
            
            <div className= "w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">

                {open? <ChatUserDialog open={open}  setOpen={setOpen} group={group} /> : <ChatNav chatGroup={group} users={users} /> }
                

                <Chats group={group}  chatUser={chatUser} oldMessages={oldMessages}/>
            </div>

        </div>

    
    
    )

}

export default ChatBase