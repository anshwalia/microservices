'use strict';

// Node Modules
import { Router } from "express";
import { MongoClient } from "mongodb";

async function makeChatRouter(databaseClient:MongoClient,makeChatController:Function) {
    try{
        const ChatRouter = Router();
        
        // Controller
        const ChatController = await makeChatController(databaseClient);

        // Routes

        // GET - /CHAT
        ChatRouter.get('/',ChatController.GET);

        // POST - /CHAT/NEW
        ChatRouter.post('/new',ChatController.NEW);

        return ChatRouter;
    }
    catch(error){ throw error; }
}

export default makeChatRouter;
