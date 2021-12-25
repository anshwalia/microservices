'use strict';

// Node Modules
import { MongoClient } from "mongodb";

// Data Access Objects
import { makeChatDAO, Chat as ChatDAO } from "../database/data-access-objects/chat.dao.js";

// Models
import  { makeChatModel, Chat as ChatModel } from "../models/chat.model.js";

class Chat{

    // Chat Data Access Object Instance
    private Chat_DAO:any;

    // Chat Model Instance
    private Chat_Model:any;

    constructor(){
        try{
            console.log("[ Chat Controller Instance Created ]");
        }
        catch(error){ throw error; }
    }

    async init(databaseClient:MongoClient) {
        try{
            this.Chat_DAO = await makeChatDAO(databaseClient);
            this.Chat_Model = await makeChatModel();
            console.log("[ CHAT CONTROLLER INIT COMPLETE ]");
        }
        catch(error){ console.log(error); }
    }

    async GET(req:any,res:any){
        try{
            res
            .status(200)
            .json({ ok: true, message: "All Good!" });
        }
        catch(error){ console.log(error); }
    }

    async NEW(req:any,res:any) {
        try{
            const chat_title:string  = req.body?.['title'] ?? null;
            const chat_users:string[] = req.body?.['users'] ?? null;

            // res
            // .status(200)
            // .json({ ok: true, message: "New Chat", data: { chat_title, chat_users } });

            if((chat_title)&&(chat_users)){
                
                res
                .status(200)
                .json({ ok: true, message: "New Chat", data: { chat_title, chat_users } });

                // const newChat = await this.ChatModel.createNewChat(chat_title,chat_users);

                // await this.Chat_DAO.addChat(newChat);

                // SUCCESS - RESPONSE - 200
                // res
                // .status(200)
                // .json({ ok: true, message: `Chat created with title ${chat_title}` });
            }
            else{
                // FAILED - RESPONSE - 400
                res
                .status(400)
                .json({ ok: false, message: "Invalid Input!" });
            }

        }
        catch(error){ console.log(error); }
    }

}

async function makeChatController(databaseClient:MongoClient) {
    try{
        const ChatController = new Chat();
        await ChatController.init(databaseClient);
        return ChatController;
    }
    catch(error){ throw error; }
}

export default makeChatController;