'use strict';

// Express App
import makeExpressApp from "./app.js";

// Database
import makeDatabaseClient from "./database/client.js";

// Routers
import makeChatRouter from "./routers/chat.router.js";

// Controllers
import makeChatController from "./controllers/chat.controller.js";

export const dependencies : {
    make: {
        app: Function;
        database: { client: Function; }
        router: { chat: Function };
        controller: { chat: Function }
    }
} = {
    make: {
        app: makeExpressApp,
        database: { client: makeDatabaseClient },
        router: { chat: makeChatRouter },
        controller: { chat: makeChatController }
    }
}

