import { Router } from "express";
import LoginValidator from "../validators/LoginValidator";
import LoginController from "../controllers/LoginController";
import authMiddleware from "../middlewares/authMiddleware";

const loginRoute = Router()

loginRoute.post('/login', LoginValidator.verifyLoginValidatorBody, LoginController.verifyLogin)
loginRoute.post('/auth/signup', LoginValidator.signupValidatorBody, LoginController.signup)
loginRoute.delete('/auth/signout', authMiddleware, LoginController.signout)

export default loginRoute