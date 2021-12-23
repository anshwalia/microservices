'use strict';

// Node Modules
import dotenv from "dotenv";
dotenv.config();

// JSON Web Tokens Library
import jsonwebtoken from "jsonwebtoken";

const Token = {

    enableLogs: null,

    init: async function(enableLogs){
        try{
            this.enableLogs = enableLogs;
            if(this.enableLogs){ 
                console.log("[TOKENS MODEL INIT SUCCESS]"); 
            }
        }
        catch(error){ throw error; }
    },

    // Method To Create Access JWT Token
    createAccessToken: async function(user_email=""){
        try{
            const payload = { email: user_email }

            const access_token = jsonwebtoken.sign(payload,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: "15m" });

            return access_token;
        }
        catch(error){ throw error; }
    },

    // Method To Create Refresh JWT Token
    createRefreshToken: async function(user_email=""){
        try{
            const payload = { email: user_email }

            const refresh_token = jsonwebtoken.sign(payload,process.env.REFRESH_TOKEN_SECRET,{ expiresIn: "7d" });

            return refresh_token;
        }
        catch(error){ throw error; }
    },
}

export default Token;