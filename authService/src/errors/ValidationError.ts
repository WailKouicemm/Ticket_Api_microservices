

import { ValidationError } from "express-validator";


class CustomRequestValidationError extends Error{

    errors : ValidationError[] ;
    status : number
    constructor( errorrs : ValidationError[],status : number) {
        super()
        this.errors = errorrs;
        this.status = status

    }
}

export = CustomRequestValidationError;