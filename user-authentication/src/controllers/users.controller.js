'use strict';

// Data Access Objects
import UsersDAO from "../database/data-access-objects/users.dao.js";

// Models
import ValidationModel from "../models/validation.model.js";
import UserModel from "../models/user.model.js";
import TokensModel from "../models/token.model.js";

const UsersController = {

    enableLogs: false,
    
    init: async function(databaseClient,SECRETS,enableLogs=false){
        try{
            this.enableLogs = enableLogs;
            await UsersDAO.init(databaseClient,enableLogs);
            await UserModel.init(enableLogs);
            await TokensModel.init(SECRETS,enableLogs);
            // Logs
            if(this.enableLogs){ console.log("[USERS CONTROLLER INIT SUCCESS]"); }
        }
        catch(error){ throw error; }
    },

    REGISTER: async function(req,res){
        try{
            const { first_name, last_name, email, password } = req.body;

            const validationResult = await ValidationModel.validate_user({ first_name, last_name, email, password });

            if(validationResult.ok){
                
                const existingUser = await UsersDAO.getUserByEmail(email);

                if(existingUser === null){

                    const user = await UserModel.createNewUser({ first_name, last_name, email, password });

                    await UsersDAO.addUser(user);
                    
                    // SUCCESS - RESPONSE
                    res
                    .status(200)
                    .json({ 
                        ok: true, 
                        message: `Successfully created user with email ${user.email}` 
                    });
                }
                else{
                    // FAILED - RESPONSE - 400
                    res
                    .status(400)
                    .json({ 
                        ok: false, 
                        message:  `User with email: ${email} already exists.`
                    });
                }

            }
            else{
                // FAILED - RESPONSE - 400
                res
                .status(400)
                .json({
                    ok: false,
                    message: "Validation Failed",
                    errors: validationResult.errors
                });
            }
        }
        catch(error){ 
            // FAILED - RESPONSE
            res
            .status(500)
            .json({ ok: false, message: "Server Error!" });

            throw error;
        }
    },

    LOGIN_GET: async function(req,res){
        try{
            const auth = req.body?.["auth"] ?? null;

            if(auth != null){ 

                if(auth.verified){

                    const user = await UsersDAO.getUserByEmail(auth.email);

                    if(user !== null){
                        // SUCCESS - RESPONSE - 200
                        const { first_name, last_name, email } = user; 
                        res
                        .status(200)
                        .json({ ok: true, user_info: { first_name, last_name, email } });
                    }
                    else{
                        // FAILED - RESPONSE - 404
                        res
                        .status(404)
                        .json({ ok: false, message: "User Not Found"});
                    }
                }
                else{
                    // FAILED - RESPONSE - 400
                    res
                    .status(400)
                    .json({ ok: false, message: auth.message });
                }

            }
            else{
                // FAILED - RESPONSE - 404
                res
                .status(404)
                .json({ ok: false, message: "User Not Logged In"});
            }
        }
        catch(error){ throw error; }
    },

    LOGIN_POST: async function(req,res){
        try{

            const { email, password } = req.body;

            const user = await UsersDAO.getUserByEmail(email);

            if(user !== null){

                const passwordMatch = await UserModel.matchPassword(password,user.password);
                
                if(passwordMatch){

                    const access_token = await TokensModel.createAccessToken(user.email);
                    const refresh_token = await TokensModel.createRefreshToken(user.email);

                    // await UsersDAO.updateRefreshToken
                    await UsersDAO.updateAccessToken(user.email,access_token);
                    await UsersDAO.updateRefreshToken(user.email,refresh_token);

                    // Setting Access and Refresh Tokens as Cookies
                    res.cookie("access_token",access_token,{ maxAge: (1000 * 60 * 60), httpOnly: true });
                    res.cookie("refresh_token",refresh_token,{ maxAge: (1000 * 60 * 60 * 24) , httpOnly: true });

                    // SUCCESS - RESPONSE
                    res
                    .status(200)
                    .json({ 
                        ok: true, 
                        login: "success",
                        user_info: {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email
                        }
                    });
                }
                else{
                    // FAILED - RESPONSE - 400
                    res
                    .status(400)
                    .json({ ok: false, message: "Invalid username or password!" });
                }

            }
            else{
                // FAILED - RESPONSE - 404
                res
                .status(404)
                .json({ ok: false, message: "User Not Found!" });   
            }
        }
        catch(error){ 
            // FAILED - RESPONSE - 500
            res
            .status(500)
            .json({ ok: false, message: "Server Error!" });

            throw error;
        }
    }

}

// Function To Make Users Controller
const makeUsersController = async (databaseClient,SECRETS) => {
    try{
        await UsersController.init(databaseClient,SECRETS,true);
        return UsersController;
    }
    catch(error){ throw error; }
}

export default makeUsersController;