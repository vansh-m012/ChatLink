import { CHAT_GROUP_URL, CHAT_GROUP_USERS_URL } from "@/lib/apiEndPoints";


// first time hit, fresh fetch will happen. Rest for 1hr => cached version of that api.
export async function fetchChatGroups(token: string){

    const res = await fetch( CHAT_GROUP_URL, {

        headers:{
            authorization: token
        },

        next:{
            revalidate: 60*60,  //  after 1 hour, fresh request will sent. Before that if same api is hit, the cached version will be given. NOTE => cache is internally managed by the nextJS
            tags: ["dashboard"] // helpful in doing this => revalidateTag("dashboard");
             
        }
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



export async function fetchChatGroup( id: string){

    const res = await fetch( `${CHAT_GROUP_URL}/${id}`, {

        cache: "no-cache"

    })

    if(!res.ok){
        throw new Error("Failed to fetch data")
    }

    const response = await res.json();  // chatController.ts => index()

    if(response?.data){
        return response.data;
    }

    return null;
}



export async function fetchChatUsers(id: string){

    const res = await fetch(`${CHAT_GROUP_USERS_URL}?group_id=${id}`, {
        cache: "no-cache",
    });

    if(!res.ok){
        throw new Error("Failed to fetch data")
    }

    const response = await res.json();  // chatController.ts => index()

    if(response?.data){
        return response.data;
    }

    return [];
}


