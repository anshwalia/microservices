'use strict';

const UsersDAO = {

    database: {
        name: 'test',
        client: null,
        connection: null,
        collectionName: 'users',
        collection: null
    },

    enableLogs : null,

    init: async function(databaseClient,enableLogs=false){
        try{
            this.enableLogs = enableLogs;
            
            this.database.client = databaseClient;

            this.database.connection = await this.database.client.connect();
            if(this.enableLogs){ 
                console.log(`[Users DAO Database Connected]`); 
            } //Logs

            this.database.collection = await this.database.connection.db(this.database.name).collection(this.database.collectionName);
            if(this.enableLogs){ 
                console.log(`[Users DAO Collection Connected]`); 
            } //Logs
            
            if(this.enableLogs){ 
                console.log(`[Users DAO Init Success]`); 
            } //Logs
        }
        catch(error){ throw error; }
    },

    getUser: async function(email=""){
        try{
            const cursor = await this.database.collection.find({ "email" : email });

            const result = await cursor.next();

            return (result !== null) ? Object.freeze(result) : null;
        }
        catch(error){ throw error; }
    },

    addUser: async function(user={}){
        try{
            const status = await this.database.collection.insertOne(user);
            if(status.acknowledged){ console.log("[ USERS DAO ADDED NEW USER ]"); }
        }
        catch(error){ throw error; }
    },

    updateRefreshToken: async function(email="",refreshToken=""){
        try{
            const status = await this.database.collection.updateOne({ email: email}, { $set: { refreshToken: refreshToken }});
            if(status.acknowledged){ console.log("[ USERS DAO UPDATED REFRESH TOKEN ]"); }
        }
        catch(error){ throw error; }
    }

}

export default UsersDAO;