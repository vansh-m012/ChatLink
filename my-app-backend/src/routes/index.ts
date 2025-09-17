import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import ChatGroupController from "../controllers/ChatGroupController.js";
import ChatGroupUserController from "../controllers/ChatGroupUserController.js";
import ChatsController from "../controllers/ChatsController.js";

const router= Router();


// Auth route
router.post( "/auth/login", AuthController.login); // handles this request => /api/auth/login


// chatGroup route
// middleware always comes into picture for (pvt./authenticated) route
router.post( "/chatGroup", authMiddleware,  ChatGroupController.store)

// fetch all chatGroup of the entered authenticated user.
router.get("/chatGroup", authMiddleware, ChatGroupController.index);

// fetch one(uuid) chatGroup
router.get("/chatGroup/:id", ChatGroupController.show);  

// update one(uuid) chatGroup details(title,passcode) 
router.put("/chatGroup/:id", authMiddleware, ChatGroupController.update);


// delete one(uuid) chatGroup
router.delete("/chatGroup/:id", authMiddleware, ChatGroupController.destroy);





//chat group users
router.post( "/chatGroupUsers", ChatGroupUserController.store);
router.get("/chatGroupUsers", ChatGroupUserController.index);


// chats Messages
router.get("/chats/:groupId", ChatsController.index);


export default router;