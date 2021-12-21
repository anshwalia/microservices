'use strict';

// MongoDB Client Module
import { MongoClient } from "mongodb";

const makeDatabaseClient = (DatabaseURL) => {
    try{
        const DATABASE_CLIENT_OPTIONS = {
            maxPoolSize: 10,
            connectTimeoutMS: 2500,
        }

        const databaseClient = new MongoClient(DatabaseURL,DATABASE_CLIENT_OPTIONS);

        return databaseClient;
    }
    catch(error){ throw error; }
}

export default makeDatabaseClient;