'use strict';

// Node Modules
import dotenv from "dotenv"; dotenv.config();

// Dependencies
import { Dependencies } from "./config.js";

// Function To Start Server
const startServer = async ({ makeApp, routerMakers, controllerMakers, makeDatabaseClient }) => {
    try{
        const PORT = process.env.PORT || 3000;

        const DatabaseURL = process.env.DB_URL;

        const SECRETS = {
            ACCESS: process.env.ACCESS_TOKEN_SECRET,
            REFRESH: process.env.REFRESH_TOKEN_SECRET
        }

        const databaseClient = await makeDatabaseClient(DatabaseURL);

        const app = await makeApp({ routerMakers, controllerMakers, databaseClient, SECRETS });

        app.listen(PORT,() => { console.log(`SERVER STARTED @ PORT ${PORT}`); });
    }
    catch(error){ console.error(error); }
}

// Start Point
startServer(Dependencies);