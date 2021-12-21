'use strict';

// Node Module
import validator from "validator";

const ValidationModel = {

    validate: async function({ name, email, password }){
        try{
            const result = {
                ok: true,
                errors: []
            }

            const validName = validator.isAlpha(name,"en-IN",{ ignore: ' ' });

            const validEmail = validator.isEmail(email);

            const validPassword = validator.isStrongPassword(password);

            if(!validName){
                result.ok = false;
                result.errors.push("Invalid name");
            }

            if(!validEmail){
                result.ok = false;
                result.errors.push("Invalid email");
            }

            if(!validPassword){
                result.ok = false;
                result.errors.push("Invalid password");
            }

            return result;
        }
        catch(error){ throw error; }
    },


}

export default ValidationModel;