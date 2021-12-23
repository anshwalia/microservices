'use strict';

// Node Modules
import bcrypt from "bcrypt";

const Crypto = {

    // Method To Hash Password
    hashPassword: async function(password=""){
        try{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password,salt);
            return hashedPassword;
        }
        catch(error){ throw error; }
    },

    // Method To Check If The Login Password and User Password Matches
    comparePassword: async function(login_password="",user_password=""){
        try{ return await bcrypt.compare(login_password,user_password); }
        catch(error){ throw error; }
    }
    
}

export default Crypto;