import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import ReviewController from "../controllers/ReviewController";
import ReviewValidator from "../validators/ReviewValidator";

const reviewsRoute = Router()

reviewsRoute.post('/:id', authMiddleware, ReviewValidator.addReviewBodyValidator, ReviewController.addReview)
reviewsRoute.get('/:movieId?/:page?/:pageSize?/:sortDir?/:sortBy?', authMiddleware, ReviewController.searchReview)


export default reviewsRoute