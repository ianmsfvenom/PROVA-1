import { NextFunction, Request, Response } from "express";
import { AddReviewBody } from "../types/review";
import ApiError from "../helpers/ApiErrorHelper";

export default new class ReviewValidator {
    public async addReviewBodyValidator(req: Request<{}, {}, AddReviewBody>, res: Response, next: NextFunction) {
        const { content, stars, movieId } = req.body
        
        if(typeof content != 'string' || 
            typeof stars != 'number' || 
            typeof movieId != 'string' ) return next(new ApiError('Invalid properties', 422));

        next()
    }
}