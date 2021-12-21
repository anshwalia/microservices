'use strict';

// Node Modules
import bcrypt from "bcrypt";

const UserModel = {

    enableLogs: null,

    SALT_ROUNDS: 10,

    init: async function(enableLogs=false){
        try{
            this.enableLogs = enableLogs;
            if(this.enableLogs){
                console.log("[ USER MODEL INIT SUCCESS ]");
            }
        }
        catch(error){ throw error; }
    },

    hashPassword: async function(password=""){
        try{
            const hashedPassword = await bcrypt.hash(password,this.SALT_ROUNDS);
            return hashedPassword;
        }
        catch(error){ throw error; }
    },

    createNewUser: async function({ name, email, password }){
        try{
            const hashedPassword = await this.hashPassword(password);

            return {
                time_stamp: Date.now(),
                name: name,
                email: email, 
                password: hashedPassword 
            }
        }
        catch(error){ throw error; }
    },

    login: async function(loginUserPassword,existingUserPassword){
        try{
            return await bcrypt.compare(loginUserPassword,existingUserPassword);
        }
        catch(error){ throw error; }
    }

}

export default UserModel;