
import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 7000;
import routes from "./routes/index.js"; 
// this is router of ./routes/index.js only, now just stored inside a new variable routes.


import {Server} from "socket.io"
import {createServer} from "http"
import { setupSocket } from "./socket.js";

import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";

import {instrument} from "@socket.io/admin-ui"
import { connectKafkaProducer } from "./config/kafka.config.js";
import { consumeMessages } from "./helper.js";

const server= createServer(app);   // http ke server me purre app ko wrap kr liye. //**  Normal web server ban gaya. whatsup 10/9

//** Socket.io attached to Normal web server
// cors* => any frontend can connect to my server.
const io= new Server( server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true
  },

  // whatsup 13sept
  adapter: createAdapter(redis)

})


// from admin/socket.io docs
instrument(io, {
  auth: false,
  mode: "development",
});


setupSocket(io);
export {io}



// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

// since producer, therefore catch
connectKafkaProducer().catch( (error) => {
  console.log("Something went wrong while connecting to kafka...")
});

consumeMessages(process.env.KAFKA_TOPIC!).catch((err) =>
  console.log("The Kafka Consume error", err)
);




// server(http.createServer) is necessary to run backend on multiple ports convinently. see line no. 72
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

app.use("/api", routes);











// http.createServer(app) → explicitly server object banata hai, aur aap usse multiple ports pe use kar sakte ho.
// app.listen() → shortcut, internally wahi kar raha hai, lekin ek port ke liye hi convenient hai.

// 💡Extra tip:
// Agar aap multiple ports pe same app run karna chahte ho → explicit http.createServer(app) use karna better hota hai, kyunki aapko alag server objects milte hain aur unhe independently control kar sakte ho.


