'use strict';

// Node Modules
import { MongoClient } from "mongodb";

// Data Access Objects
import Chat from "../database/data-access-objects/chat.dao.js";

const ChatController : {
    ChatDAO: Chat;
    init: Function;
    GET: Function;
} = {

    // Chat Data Access Object Instance
    ChatDAO: new Chat(),

    init: async function(databaseClient:MongoClient) {
        try{
            await this.ChatDAO.init(databaseClient);
            console.log("[ CHAT CONTROLLER INIT COMPLETE ]");
        }
        catch(error){ console.log(error); }
    },

    GET: async function(req:any,res:any){
        try{
            res
            .status(200)
            .json({ ok: true, message: "All Good!" });
        }
        catch(error){ console.log(error); }
    }

}

async function makeChatController(databaseClient:MongoClient) {
    try{
        await ChatController.init(databaseClient);
        return ChatController;
    }
    catch(error){ throw error; }
}

export default makeChatController;