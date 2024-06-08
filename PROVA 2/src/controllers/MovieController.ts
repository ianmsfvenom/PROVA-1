import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { GetAllMoviesParams, SearchMovieParams } from "../types/movie";
import ApiError from "../helpers/ApiErrorHelper";
import { host } from "../config/app";

export default new class MovieController {
    public async getAllMovies(req: Request<GetAllMoviesParams>, res: Response, next: NextFunction) {
        var { page, pageSize, sortDir, sortBy } = req.params
        
        if(!page || typeof page != 'number') page = 1
        if(!pageSize || typeof pageSize != 'number') pageSize = 4
        if(!sortDir || typeof sortDir != 'string') sortDir = 'desc'
        if(!sortBy || typeof sortBy != 'string') sortBy = 'releaseDate'

        var allMovies;
        if(sortBy == 'releaseDate') {
            allMovies = (await prisma.movie.findMany({
                orderBy: {
                    release_date: sortDir
                },
                take: Number(pageSize),
                skip: Number(page)
            })).map(value => ({
                id: value.id,
                title: value.title,
                duration: value.duration_minutes,
                releaseDate: value.release_date,
                posterUrl: value.poster_url,
                singlePageUrl: `${host}/movies/${value.id}`
            }))
        } else {
            allMovies = (await prisma.movie.findMany({
                orderBy: {
                    title: sortDir
                },
                take: Number(pageSize),
                skip: Number(page)
            })).map(value => ({
                id: value.id,
                title: value.title,
                duration: value.duration_minutes,
                releaseDate: value.release_date,
                posterUrl: value.poster_url,
                singlePageUrl: `${host}/movies/${value.id}`
            }))
        }

        res.json(allMovies)
    }

    public async searchMovie(req: Request<SearchMovieParams>, res: Response, next: NextFunction) {
        const { id } = req.params
        
        const findMovie = await prisma.movie.findFirst({ where: { id }})
        if(!findMovie) return next(new ApiError('Not Founded', 404));

        res.json(findMovie)
    }
}