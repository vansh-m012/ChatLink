// This is a private route since only accessible for the loggedIn user, therefore we have to make a middleware
import { Request, Response } from "express"
import prisma from "../config/db.config.js";


class ChatGroupController {

    
    

    static async store( req: Request, res: Response){

        try{
            const body= req.body;  // client sends this body: (group_title, passcode ). We don't send email, name in req.body bcz then anyone can create Chatgroups by injecting (group_title, passcode, name, email) of a user. Therefore Authmiddleware setted up for jwtverification to know who is creating this group.
            const user= req.user;  // to extract the user's data(id, name, email) we need backend data as these sensitive info not comes in req.body, therefore we setted up AuthMiddleware.ts
           
            
            // prisma saves model names in camelCase in @prisma/client 
            await prisma.chatGroup.create({
                 data: {
                    title: body?.title,
                    passcode: body?.passcode,
                    user_id: user!.id   //in ts.config.json stict:true isley mujhe "!" lgana pdta hai to do make typescript forcefully understand it would be a valid data.
                 }
            })

            return res.json({message: "chatGroup created successfully"});


        }

        catch(error){
            return res.status(500).json({message: "something went wrong"});
        }
    }



    // according to user_id extract all its chatGroups. #Many
    static async index( req: Request, res: Response ){

        try{
            const user = req.user;
            
            // from the (supabase/DB) (find/fetch) only that user chatGroup1,chatGroup2... through which req has came from frontend.
            const groups = await prisma.chatGroup.findMany({
                where: {
                user_id: user!.id,
                },

                orderBy: {
                    created_at: "desc",
                },
            });

            return res.json({message:"chatGroups fetched successfully",  data: groups });
        }

        catch(error){
            return res.status(500).json({message: "something went wrong"});
        }

    }



    // according to a (chatGroup personal uuid), extract that one chatGroup. #One
    static async show( req: Request, res: Response ){

        try{
            const { id } = req.params;
            if (id) {
                const group = await prisma.chatGroup.findUnique({
                    where: {
                    id: id,
                    },
                });

                return res.json({message:"chatGroup fetched successfully",  data: group });
            }
        }

        catch(error){
            return res.status(500).json({message: "something went wrong"});
        }

    }
    



    static async update(req: Request, res: Response) {

        try {
            const { id } = req.params;
            const body = req.body;  // we will send what we need to update like (title & passcode)

            if (id) {
                await prisma.chatGroup.update({
                data: body,  // OR  data : { title: body.title, passcode: body.passcode}
                where: {
                    id: id,
                },
                });
                return res.json({ message: "Group updated successfully!" });
            }
            else{
                return res.status(404).json({ message: "No groups found" }); // if id not present i.e. No chatGroup with that uuid.
            }
            
        }

        catch (error) {
            return res.status(500).json({ message: "Something went wrong.please try again!" });
        }

    }


    static async destroy( req: Request, res: Response ){

        try{
            const { id } = req.params;
            if (id) {
                await prisma.chatGroup.delete({
                    where: {
                    id: id,
                    },
                });

                return res.json({message:"chatGroup deleted successfully"});
            }
        }

        catch(error){
            return res.status(500).json({message: "something went wrong"});
        }

    }

}

export default ChatGroupController 