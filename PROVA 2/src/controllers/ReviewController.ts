import { NextFunction, Request, Response } from "express";
import { AddReviewBody, DeleteReviewParam, SearchReviewParam } from "../types/review";
import ApiError from "../helpers/ApiErrorHelper";
import prisma from "../config/prisma";

export default new class ReviewController {
    public async addReview(req: Request<{}, {}, AddReviewBody>, res: Response, next: NextFunction) {
        const { content, movieId, stars } = req.body
        const token = req.headers.authorization

        if(!token) return next(new ApiError('Unauthenticated user', 401));

        const findToken = await prisma.accessToken.findFirst({ where: { token_string: token }})
        if(!findToken) return next(new ApiError('Invalid token', 403));

        const userId = findToken.user_id
        const createReview = await prisma.review.create({
            data: {
                user_id: userId,
                createdAt: new Date(),
                stars,
                content,
                movie_id: movieId
            }
        })

        res.status(201).json(createReview)
    }

    public async searchReview(req: Request<SearchReviewParam>, res: Response, next: NextFunction) {
       var { movieId, page, pageSize, sortBy, sortDir } = req.params

        if(!movieId) return next(new ApiError('Bad Request', 400))
        if(!page || typeof page != 'number') page = 1
        if(!pageSize || typeof page != 'number') pageSize = 10
        if(!sortBy || typeof page != 'string') sortBy = 'stars'
        if(!sortDir || typeof page != 'string') sortDir = 'desc'

        const findMovieId = await prisma.movie.findFirst({ where: { id: movieId }})
        if(!findMovieId) return next(new ApiError('Movie Id not found', 404))

        var findReviews;
        if(sortBy == 'createdAt') {
            findReviews = await prisma.review.findMany({ 
                where: { movie_id: movieId }, 
                orderBy: {
                    createdAt: sortDir
                },
                skip: page,
                take: pageSize
            })
        } else {
            findReviews = await prisma.review.findMany({ 
                where: { movie_id: movieId }, 
                orderBy: {
                    stars: sortDir
                },
                skip: page,
                take: pageSize
            })
        }

        res.json(findReviews)
    }

    public async deleteReview(req: Request<DeleteReviewParam>, res: Response, next: NextFunction) {
        const { movieId } = req.params

        if(!movieId) return next(new ApiError('Bad Request', 400))
        
        const findMovie = await prisma.movie.findFirst({ where: { id: movieId }})
        if(!findMovie) return next(new ApiError('Movie Id not found', 404))

        await prisma.review.deleteMany({ 
            where: {
                movie_id: movieId
            }
        })

        res.status(204)
    }
}