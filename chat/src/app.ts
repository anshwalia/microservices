'use strict';

// Node Modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { MongoClient } from "mongodb";

// Function To Create Express App Instance
async function makeExpressApp(
    databaseClient: MongoClient,
    routerMaker: { chat: Function; },
    controllerMaker: { chat: Function }
){
    try{
        const app = express();

        // Middle Ware
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cors());
        app.use(morgan('dev'));

        // Routers
        const ChatController = await routerMaker.chat(databaseClient,controllerMaker.chat);

        // Routes

        // CHAT
        app.use('/chat',ChatController);

        // INVALID
        app.use('*',(req,res) => { 
            try{
                // RESPONSE - 404
                res
                .status(404)
                .json({ ok: false, message: "Not Found!" });
            }
            catch(error){ console.log(error); }
        });

        return app;
    }
    catch(error){ console.log(error); }
}

export default makeExpressApp;