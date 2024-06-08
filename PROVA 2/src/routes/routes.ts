import { Router } from "express";
import loginRoute from "./login.routes";
import movieRoute from "./movies.routes";
import reviewsRoute from "./reviews.routes";
import genresRoute from "./genres.routes";
import artistsRoute from "./artists.routes";

const route = Router()

route.use('/api/v1', loginRoute)
route.use('/api/v1/movies', movieRoute)
route.use('/api/v1/reviews', reviewsRoute)
route.use('/api/v1/genres', genresRoute)
route.use('/api/v1/artists', artistsRoute)

export default route