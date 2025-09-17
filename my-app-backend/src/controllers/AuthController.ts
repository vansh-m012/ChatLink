import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";

interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

class AuthController {
  
    static async login(req: Request, res: Response) {
        
        try{
            const body: LoginPayloadType= req.body;
            
            // existing user + new user creation
            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email,
                }
            });
            if (!findUser) {
                findUser = await prisma.user.create({
                    data: body,
                });
            }

            // token creation in backend
             let JWTPayload = {
                name: body.name,
                email: body.email,
                id: findUser.id,
            };


            const secret = process.env.JWT_SECRET as string; //casting as string bcz jwt accepts string
            const token = jwt.sign(JWTPayload, secret, {
                expiresIn: "365d",
            });

            
             // token created in first loggedIn in backend is send to user via cookie or (bearer/Authorization header) ".
            return res.json({
                message: "Logged in successfully!",

                user: {
                ...findUser,
                token: `Bearer ${token}`,
                },

            });


        }

        catch(error){
            return res
                .status(500)
                .json({ message: "Something went wrong.please try again!" });
        }

    }
}

export default AuthController