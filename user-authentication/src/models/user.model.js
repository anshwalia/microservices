'use strict';

// Node Modules
import bcrypt from "bcrypt";

const UserModel = {

    enableLogs: null,

    init: async function(enableLogs=false){
        try{
            this.enableLogs = enableLogs;
            if(this.enableLogs){
                console.log("[ USER MODEL INIT SUCCESS ]");
            }
        }
        catch(error){ throw error; }
    },

    // Method To Hash User Password
    hashPassword: async function(password=""){
        try{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password,salt);
            return hashedPassword;
        }
        catch(error){ throw error; }
    },

    // Method To Create New User Object
    createNewUser: async function({ first_name="", last_name="", email="", password="" }){
        try{
            const hashedPassword = await this.hashPassword(password);

            return {
                time_stamp: Date.now(),
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword 
            }
        }
        catch(error){ throw error; }
    },

    // Method To Check If The Login Password and User Password Matches
    matchPassword: async function(login_password="",user_password=""){
        try{ return await bcrypt.compare(login_password,user_password); }
        catch(error){ throw error; }
    }

}

export default UserModel;