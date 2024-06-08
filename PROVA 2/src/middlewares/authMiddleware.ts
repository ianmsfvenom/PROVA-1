import { NextFunction, Request, Response } from "express";
import ApiError from "../helpers/ApiErrorHelper";
import jwt from 'jsonwebtoken'
import privateKey from "../config/token";
import prisma from "../config/prisma";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if(!token) return next(new ApiError('Unauthenticated user', 401));

    jwt.verify(token, privateKey, async (err, user) => {
        const findAccessToken = await prisma.accessToken.findFirst({ where: { token_string: token }})

        if(err) {
            if(findAccessToken) await prisma.accessToken.delete({ where: { id: findAccessToken.id }})
            return next(new ApiError('Invalid token', 403))
        }
        const userId = user as jwt.JwtPayload
        const findUser = await prisma.user.findFirst({ where: { id: userId.id }})

        if(!findAccessToken) return next(new ApiError('Invalid token', 403))
        if(!findUser) return next(new ApiError('Invalid token', 403))
        else next()
    })
}

export default authMiddleware