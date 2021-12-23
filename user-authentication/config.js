// Node Modules
import path from "path";

// Express App Maker
import makeApp from "./src/app.js";

// Router Makers
import makeUsersRouter from "./src/routers/users.router.js";

// Controller Makers
import makeUsersController from "./src/controllers/users.controller.js";

// Database Client Maker
import makeDatabaseClient from "./src/database/client.js";

// Routers
const routerMakers = { makeUsersRouter };

// Controllers
const controllerMakers = { makeUsersController };

// Dependencies
export const Dependencies = { makeApp, routerMakers, controllerMakers, makeDatabaseClient };
