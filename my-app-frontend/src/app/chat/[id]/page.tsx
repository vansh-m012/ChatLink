import notFound from '@/app/not-found';
import ChatBase from '@/components/chat/ChatBase';
import { fetchChats } from '@/fetch/chatsFetch';
import { fetchChatGroup, fetchChatUsers } from '@/fetch/groupFetch';
import React from 'react'


// agar tum file banate ho: app/chat/[id]/page.tsx
// Next.js automatically tumhe params object provide kar deta hai:
async function chat( {params}: {params: {id: string}} ) {

    if(params.id.length != 36 ){
        return notFound();
    }

    const group: ChatGroupType | null= await fetchChatGroup(params.id);

    // if group got deleted OR wrong uuid
    if(group == null){
        return notFound();
    }

    // All the user in group
    const users: Array<GroupChatUserType> | [] = await fetchChatUsers(params.id);

    // chatsFetch
    const chats: Array<MessageType> | []= await fetchChats(params.id); 


    console.log("The group id is:", params.id );
    return (
        <div>
            {/* <h1>hello, I am a chat </h1> */}

            <ChatBase users={users} group={group} oldMessages={chats} />
        
        </div>
    )

}

export default chat