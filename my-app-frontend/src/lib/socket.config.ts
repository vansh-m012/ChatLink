// Socket → type definition hai (TypeScript me type safety ke liye).
// io → Is function ko call karte hi ek socket instance banta hai jo tumhare backend ke io (server-side) se connect hone ki koshish karta hai.
import {io, Socket} from "socket.io-client"
import Env from "./env";


// Ye design pattern ko Singleton pattern bolte hain → ek hi socket instance poore app me use hoga.
let socket: Socket;

// getSocket stores a function that return a Socket type.
export const getSocket= ():Socket => {
    if(!socket){
        socket= io(Env.BACKEND_URL, {autoConnect:false});
    }
    return socket;
}