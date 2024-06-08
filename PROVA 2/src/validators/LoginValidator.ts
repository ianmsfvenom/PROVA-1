import { NextFunction, Request, Response } from "express";
import { SignUpBody, VerifyLoginBody } from "../types/login";
import ApiError from "../helpers/ApiErrorHelper";
import { isValidEmail } from "../utils/emailUtils";

export default new class LoginValidator {
    public verifyLoginValidatorBody(req: Request<{}, {}, VerifyLoginBody>, res: Response, next: NextFunction) {
        const { email, password } = req.body

        if(typeof email != 'string' || typeof password != 'string') return next(new ApiError('Invalid properties', 422));
        if(password.length < 6) return next(new ApiError('Invalid properties', 422));

        next()

    }

    public signupValidatorBody(req: Request<{}, {}, SignUpBody>, res: Response, next: NextFunction) { 
        const { email, password, name, username } = req.body
        
        if(typeof email != 'string' || 
            typeof password != 'string' || 
            typeof name != 'string' || 
            typeof username != 'string'
        ) return next(new ApiError('Invalid properties', 422));
        
        if(password.length < 6) return next(new ApiError('Invalid properties', 422));
        if(!isValidEmail(email)) return next(new ApiError('Invalid properties', 422));
        if(name.length < 2) return next(new ApiError('Invalid properties', 422));
        if(username.length < 4) return next(new ApiError('Invalid properties', 422));

        next()
    }
}