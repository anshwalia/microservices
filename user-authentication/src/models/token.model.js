'use strict';

// JSON Web Tokens Library
import jsonwebtoken from "jsonwebtoken";

const TokensModel = {

    enableLogs: null,

    ACCESS_TOKEN_SECRET: null,
    REFRESH_TOKEN_SECRET: null,

    init: async function(SECRETS,enableLogs){
        try{
            this.enableLogs = enableLogs;
            this.ACCESS_TOKEN_SECRET = SECRETS.ACCESS;
            this.REFRESH_TOKEN_SECRET = SECRETS.REFRESH;
            if(this.enableLogs){ 
                console.log("[TOKENS MODEL INIT SUCCESS]"); 
            }
        }
        catch(error){ throw error; }
    },

    // Method To Create Access JWT Token
    createAccessToken: async function(user_email=""){
        try{
            const payload = { email: user_email, time_stamp: Date.now() }

            const access_token = jsonwebtoken.sign(payload,this.ACCESS_TOKEN_SECRET,{ expiresIn: "15m" });

            return access_token;
        }
        catch(error){ throw error; }
    },

    // Method To Create Refresh JWT Token
    createRefreshToken: async function(user_email=""){
        try{
            const payload = { email: user_email, time_stamp: Date.now() }

            const refresh_token = jsonwebtoken.sign(payload,this.REFRESH_TOKEN_SECRET,{ expiresIn: "7d" });

            return refresh_token;
        }
        catch(error){ throw error; }
    },
}

export default TokensModel;