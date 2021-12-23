'use strict';

const Users = {

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

    addUser: async function(user={}){
        try{
            const status = await this.database.collection.insertOne(user);
            if(status.acknowledged){ console.log("[ USERS DAO ADDED NEW USER ]"); }
        }
        catch(error){ throw error; }
    },

    // Method To Get User By Email
    getUserByEmail: async function(user_email=""){
        try{
            const result = await this.database.collection.findOne({ "email" : user_email });

            return (result !== null) ? Object.freeze(result) : null;
        }
        catch(error){ throw error; }
    },

    // Method To Get User By Access Token
    getUserByAccessToken: async function(access_token=""){
        try{
            const result = await this.database.collection.findOne({ "access_token" : access_token });

            return (result !== null) ? Object.freeze(result) : null;
        }
        catch(error){ throw error; }
    },

    // Method To Get User By Refresh Token
    getUserByRefreshToken: async function(refreshToken=""){
        try{
            const result = await this.database.collection.findOne({ "refreshToken" : refreshToken });

            return (result !== null) ? Object.freeze(result) : null;
        }
        catch(error){ throw error; }
    },

    // Method To Update User JWT Access Token
    updateAccessToken: async function(user_email="",access_token=""){
        try{
            const status = await this.database.collection.updateOne({ email: user_email },{ $set: { access_token: access_token } });
            if(status.acknowledged){ console.log("[ USERS DAO UPDATED ACCESS TOKEN ]"); }
        }
        catch(error){ throw error; }
    },

    // Method To Update User JWT Refresh Token
    updateRefreshToken: async function(user_email="",refresh_token=""){
        try{
            const status = await this.database.collection.updateOne({ email: user_email}, { $set: { refresh_token: refresh_token }});
            if(status.acknowledged){ console.log("[ USERS DAO UPDATED REFRESH TOKEN ]"); }
        }
        catch(error){ throw error; }
    }

}

export default Users;