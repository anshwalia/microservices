'use strict';

const User = {

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

    // Method To Create New User Object
    createNewUser: async function({ first_name="", last_name="", email="", hashedPassword="" }){
        try{
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

}

export default User;