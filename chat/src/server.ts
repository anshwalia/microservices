'use strict';

// Node Modules
import dotenv from "dotenv"; dotenv.config();

// Dependencies
import { dependencies } from "./config.js";

async function startServer(dependencies:
    { 
        make: { 
            app: Function;
            database: { client: Function; }
            router: { chat: Function };
            controller: { chat: Function };
        } 
    }
){
    try{
        const PORT = process.env?.["PORT"] ?? 3000;

        const databaseClient = await dependencies.make.database.client();

        const app = await dependencies.make.app(databaseClient,dependencies.make.router,dependencies.make.controller);

        app.listen(PORT,() => { console.log(`SERVER STARTED @ PORT ${PORT}`); });
    }
    catch(error){ console.log(error); }
}

startServer(dependencies);