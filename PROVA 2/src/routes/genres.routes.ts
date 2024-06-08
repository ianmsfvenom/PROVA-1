import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import GenreController from "../controllers/GenreController";

const genresRoute = Router()

genresRoute.get('/:page?/:pageSize?/:sortDir?', authMiddleware, GenreController.getAllGenres)

export default genresRoute