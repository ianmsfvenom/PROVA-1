import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import ArtistController from "../controllers/ArtistController";

const artistsRoute = Router()

artistsRoute.get('/:id', authMiddleware, ArtistController.searchArtist)
artistsRoute.get('/:page?/:pageSize?/:sortDir?', authMiddleware, ArtistController.getAllArtists)

export default artistsRoute
