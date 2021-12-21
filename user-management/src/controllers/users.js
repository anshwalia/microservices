'use strict';

// Data Access Objects
import UsersDAO from "../database/data-access-objects/Users.js";

// Models
import ValidationModel from "../models/Validation.js";
import UserModel from "../models/Users.js";
import TokensModel from "../models/Tokens.js";


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

    GET: async function(req,res){
        try{
            res
            .status(200)
            .json({ ok: true, origin: 'http://localhost:5000/users/' });
        }
        catch(error){ throw error; }
    },

    REGISTER: async function(req,res){
        try{
            const { name, email, password } = req.body;

            const validationResult = await ValidationModel.validate({ name, email, password });

            if(validationResult.ok){
                
                const existingUser = await UsersDAO.getUser(email);

                if(existingUser === null){

                    const user = await UserModel.createNewUser({ name, email, password });

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

    LOGIN: async function(req,res){
        try{
            const { email, password } = req.body;

            console.log("login",email,password);

            const matchingUser = await UsersDAO.getUser(email);

            console.log("matching user",matchingUser);

            if(matchingUser !== null){

                const passwordMatch = UserModel.login(password,matchingUser.password);
                
                if(passwordMatch){

                    const accessToken = await TokensModel.createAccessToken(matchingUser.email);
                    const refreshToken = await TokensModel.createRefreshToken(matchingUser.email);

                    await UsersDAO.updateRefreshToken(matchingUser.email,refreshToken);

                    // SUCCESS - RESPONSE
                    res
                    .status(200)
                    .json({ 
                        ok: true, 
                        message: "User Login Success!",
                        accessToken: accessToken,
                        refreshToken: refreshToken 
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