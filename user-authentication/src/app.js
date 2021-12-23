'use strict';

// Node Modules
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import { requireAuth } from "./middleware/auth.middleware.js";

const makeApp = async ({ routerMakers, controllerMakers, databaseClient }) => {
    try{
        // Express App
        const app = express();

        // Middle Ware
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cors());
        app.use(cookieParser());
        app.use(requireAuth);
        app.use(morgan('dev'));

        // Router Makers
        const { makeUsersRouter } = routerMakers;

        // Controller Makers
        const { makeUsersController } = controllerMakers;
 
        const UsersRouter = await makeUsersRouter({ makeUsersController, databaseClient });
 
        // Routes
        app.use('/users',UsersRouter);

        app.use('*',(req,res) => { res.status(404).json({ ok: false, message: "Invalid Endpoint!"}); })

        return app;
    }
    catch(error){ throw error; }
}

export default makeApp;