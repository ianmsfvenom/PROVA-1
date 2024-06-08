import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import MovieController from "../controllers/MovieController";

const movieRoute = Router()

movieRoute.get('/:id', authMiddleware, MovieController.searchMovie)
movieRoute.get('/:page?/:pageSize?/:sortDir?/:sortBy?', authMiddleware, MovieController.getAllMovies)

export default movieRoute