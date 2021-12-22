'use strict';

// Node Modules
import { Router } from "express";

const makeUsersRouter = async ({ makeUsersController, databaseClient, SECRETS }) => {
    try{
        const UsersRouter = Router();

        // Users Controller
        const UsersController = await makeUsersController(databaseClient,SECRETS);
        
        // POST - REGISTER
        UsersRouter.post('/register',UsersController.REGISTER);

        // GET - LOGIN
        UsersRouter.get('/login',UsersController.LOGIN_GET);
        
        // POST - LOGIN
        UsersRouter.post('/login',UsersController.LOGIN_POST);

        // INVALID
        UsersRouter.use('*',(req,res) => { res.status(404).json({ ok: false, message: "Invalid Endpoint!"}); })

        return UsersRouter;
    }
    catch(error){ throw error; }
}

export default makeUsersRouter;