// Node Modules
import path from "path";

// Express App Maker
import makeApp from "./src/app.js";

// Router Makers
import makeUsersRouter from "./src/routes/users.js";

// Controller Makers
import makeUsersController from "./src/controllers/users.js";

// Database Client Maker
import makeDatabaseClient from "./src/database/client.js";

// Routers
const routerMakers = { makeUsersRouter };

// Controllers
const controllerMakers = { makeUsersController };

// Dependencies
export const Dependencies = { makeApp, routerMakers, controllerMakers, makeDatabaseClient };

// User File Path
export const getUsersFilePath = async () => {
    try{
        const usersFilePath = path.resolve(__dirname,'./src/data/users.json');
        return usersFilePath;
    }
    catch(error){ throw error; }
}
