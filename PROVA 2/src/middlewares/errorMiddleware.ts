import { NextFunction, Request, Response } from "express"
import ApiError from "../helpers/ApiErrorHelper"

const errorMiddleware = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    if(error) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            messsage: error.message
        })
    }
}   


export default errorMiddleware