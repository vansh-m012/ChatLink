import { Socket, Server} from "socket.io"
import prisma from "./config/db.config.js";
import { produceMessage } from "./helper.js";

// adding room property to Socket
interface customSocket extends Socket{
    room?: string
}

//connection event → jab koi client connect kare.
//disconnect event → jab client chala jaye.
export function setupSocket(io : Server){

    // socket.io MIDDLEWARE
    io.use( (socket: customSocket, next) => {

        const room= socket.handshake.auth.room  ||  socket.handshake.headers.room ; // socket.handshake.headers.room for postman testing;
        if(!room){
            return next(new Error("Invalid room"));
        }
        socket.room= room;
        next();

    } ) 



    // Har client ka ek   "socket  object" hota hai jo uske sath baat karne ke liye use hota hai.
    //**  io hitted => specific (socket object/pipe/Application layer) created.
    io.on( "connection", (socket: customSocket) => {

        // joined in a common groupId
        socket.join(socket.room!);
        


        console.log("The socket connected...", socket.id)

        // event listener
        socket.on("message", async (data)=> {
            console.log(" (server side/8000) message is", data);  // 2nd time
            // socket.broadcast.emit("message", data)   // 3rd time ( S to C )


            // await prisma.chats.create({
            //     data: data
            // });
            await produceMessage("chats", data);


            // To everyone in room excpet sender. (io.to  se everyone + sender ko bhi jata hai )
            socket.to(socket.room!).emit("message", data);
        })


        socket.on("disconnect",  () => {
            console.log("A user is disconnected", socket.id);
        })

    } ) 

}