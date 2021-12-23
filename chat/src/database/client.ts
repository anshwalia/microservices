'use strict';

// Node Modules
import dotenv from "dotenv"; dotenv.config();
import { MongoClient } from "mongodb";

// Function To Make Database Client
async function makeDatabaseClient() {
    try{
        const DATABASE_URL = process.env.DB_URL!;

        const client = new MongoClient(DATABASE_URL);

        return client;
    }
    catch(error){ throw error; }
}

export default makeDatabaseClient;