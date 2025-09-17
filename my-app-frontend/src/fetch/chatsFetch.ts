
import {CHATS_URL} from "@/lib/apiEndPoints";

export async function fetchChats( groupId: string){

    const res = await fetch( `${CHATS_URL}/${groupId}`,  {

        //NO NEED OF HEADER SINCE PUBLIC ROUTE//
        // headers:{
        //     authorization: token
        // },

        cache: "no-cache"
    })

    if(!res.ok){
        throw new Error("Failed to fetch data")
    }

    const response = await res.json();  // chatController.ts => index()

    if(response?.data){
        return response.data;
    }

    return [];
}