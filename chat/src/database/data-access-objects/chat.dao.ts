'use strict';

// Node Modules
import { MongoClient } from "mongodb";

class Chat{

    #database: {
        connection: any,
        collection: any
    } = {
        connection: null,
        collection: null
    }

    constructor(){
        try{
            console.log("[ CHAT DAO INSTANCE CREATED ]");
        }
        catch(error){ throw error; }
    }

    async init(databaseClient:MongoClient){
        try{
            this.#database.connection = await databaseClient.connect();

            this.#database.collection = await this.#database.connection.db('test').collection('chat');

            console.log("[ CHAT DAO INIT COMPLETE ]");
        }
        catch(error){ throw error; }
    }

}

export default Chat;