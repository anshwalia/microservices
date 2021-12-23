'use strict';

// Node Modules
import dotenv from "dotenv";
dotenv.config();

// JSON Web Tokens Library
import jsonwebtoken from "jsonwebtoken";

export function requireAuth(req,res,next){
    try{
        const access_token = req.cookies?.["access_token"] ?? null;

        if(access_token !== null){
            jsonwebtoken.verify(access_token,process.env.ACCESS_TOKEN_SECRET,(error, decoded_token) => {
                if(error){
                    req.body.auth = Object.freeze({ verified: false, message: error.message });
                }
                else{
                    req.body.auth = Object.freeze({ verified: true, email: decoded_token.email });
                }
            });
        }

        next();
    }
    catch(error){ throw error; }
}