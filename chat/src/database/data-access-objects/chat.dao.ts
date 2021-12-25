'use strict';

// Node Modules
import { MongoClient } from "mongodb";

// Chat Data Access Object
export class Chat{

    private connection:any;
    private collection:any;

    constructor(){
        try{
            console.log("[ CHAT DAO INSTANCE CREATED ]");
        }
        catch(error){ throw error; }
    }

    async init(databaseClient:MongoClient){
        try{
            this.connection = await databaseClient.connect();

            this.collection = await this.connection.db('test').collection('chat');

            console.log("[ CHAT DAO INIT COMPLETE ]");
        }
        catch(error){ throw error; }
    }

    async addChat(chatObject:object){
        try{
            const result = await this.collection.insertOne(chatObject);
            console.log(result);
        }
        catch(error){ throw error; }
    }

}

// Function To Make Chat Data Access Object
export async function makeChatDAO(databaseClient:MongoClient) {
    try{
        const ChatDAO = new Chat();
        await ChatDAO.init(databaseClient);
        return ChatDAO;
    }
    catch(error){ throw error; }
}