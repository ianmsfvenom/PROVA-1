import { NextFunction, Request, Response } from "express";
import { SignUpBody, VerifyLoginBody } from "../types/login";
import jwt from 'jsonwebtoken'
import prisma from "../config/prisma";
import ApiError from "../helpers/ApiErrorHelper";
import privateKey from "../config/token";
import { comparePassword, encryptPassword } from "../utils/bcryptUtils";

export default new class LoginController {
    public async verifyLogin(req: Request<{}, {}, VerifyLoginBody>, res: Response, next: NextFunction) {
        const { email, password } = req.body

        const findUser = await prisma.user.findFirst({ where: { email }})
        if(!findUser) return next(new ApiError('Invalid email or password', 422))
        if(!(await comparePassword(findUser.password, password))) return next(new ApiError('Invalid email or password', 422))
        
        const token = jwt.sign({ id: findUser.id }, privateKey, { algorithm: 'RS256', expiresIn: '1h' })

        await prisma.accessToken.create({
            data: {
                creation_date: new Date(),
                token_string: token,
                user_id: findUser.id
            }
        })

        res.json({ token })
    }

    public async signup(req: Request<{}, {}, SignUpBody>, res: Response, next: NextFunction ) {
        const { email, name, password, username } = req.body

        const existsUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        })

        if(existsUser) return next(new ApiError('User already exists', 409));

        const encryptedPassword = await encryptPassword(password)

        const createUser = await prisma.user.create({
            data: {
                email,
                name,
                password: encryptedPassword,
                username
            }
        })

        res.json(createUser)
    }

    public async signout(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization

        if(!token) return next(new ApiError('Unauthenticated user', 401));

        const findToken = await prisma.accessToken.findFirst({ where: { token_string: token }})
        if(!findToken) return next(new ApiError('Invalid token', 403))
        
        await prisma.accessToken.delete({ where: { id: findToken.id }})

        res.status(204).json({
            message: "success!"
        })
    }
}