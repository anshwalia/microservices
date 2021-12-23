'use strict';

// Node Module
import validator from "validator";

const Validation = {

    // Validate New User Info
    validate_user: async function({ first_name, last_name, email, password }){
        try{
            const result = {
                ok: true,
                errors: []
            }

            const validFirstName = validator.isAlpha(first_name);

            const validLastName = validator.isAlpha(last_name);

            const validEmail = validator.isEmail(email);

            const validPassword = validator.isStrongPassword(password);

            if(!validFirstName){
                result.ok = false;
                result.errors.push("Invalid first name");
            }

            if(!validLastName){
                result.ok = false;
                result.errors.push("Invalid last name");
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

    // Validate User Login Info
    validate_login: async function(user_email="",user_password=""){
        try{
            const result = { ok: true, errors: [] };

            const validEmail = validator.isEmail(user_email);

            const validPassword = validator.isStrongPassword(user_password);

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
    }
}

export default Validation;