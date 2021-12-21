'use strict';

import jsonwebtoken from "jsonwebtoken";

const TokensModel = {

    enableLogs: null,

    ACCESS_SECRET: null,
    REFRESH_SECRET: null,

    init: async function({ ACCESS, REFRESH },enableLogs){
        try{
            this.enableLogs = enableLogs;
            this.ACCESS_SECRET = ACCESS;
            this.REFRESH_SECRET = REFRESH;
            if(this.enableLogs){ 
                console.log("[TOKENS MODEL INIT SUCCESS]"); 
            }
        }
        catch(error){ throw error; }
    },

    // Method To Create Access JWT Token
    createAccessToken: async function(userID){
        try{
            return jsonwebtoken.sign(
                { userID }, this.ACCESS_SECRET,
                { expiresIn: "15m" });
        }
        catch(error){ throw error; }
    },

    // Method To Create Refresh JWT Token
    createRefreshToken: async function(userID){
        try{
            return jsonwebtoken.sign(
                { userID }, this.REFRESH_SECRET,
                { expiresIn: "7d" });
        }
        catch(error){ throw error; }
    },
}

export default TokensModel;