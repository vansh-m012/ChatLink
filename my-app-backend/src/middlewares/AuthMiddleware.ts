import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const authMiddleware = ( req: Request, res: Response, next: NextFunction) => {

    console.log("👉 Authorization header:", req.headers.authorization);

    // what is header => in whatsup img 6/9
    const authHeader= req.headers.authorization

    if(authHeader===null || authHeader===undefined ){
        return res.status(401).json({ status:401, message: "unauthorized user"})
    }
    const token= authHeader.split(" ")[1]   

    
    // token= header.payload.signature
    jwt.verify( token, process.env.JWT_SECRET!, (err,user) => {

        if(err){
            return res.status(401).json({ status:401, message: "unauthorized user"});
        }

        // here user is payload of the JWT token after verification.
        req.user= user as AuthUser; // req not offers user, therefore we made that in (custom-tyes-d.ts file in routes folder).
    
        next();

    })


}

export default authMiddleware;
