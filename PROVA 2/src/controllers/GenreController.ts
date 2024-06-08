import { NextFunction, Request, Response } from "express";
import { GetaAllGenresParams } from "../types/genre";
import prisma from "../config/prisma";

export default new class GenreController {
    public async getAllGenres(req: Request<GetaAllGenresParams>, res: Response, next: NextFunction) {
        var { page, pageSize, sortDir } = req.params

        if(!page || typeof page != 'number') page = 1
        if(!pageSize || typeof page != 'number') pageSize = 10
        if(!sortDir || typeof page != 'string') sortDir = 'desc'

        const allGenres = await prisma.genre.findMany({
            take: pageSize,
            skip: page,
            orderBy: {
                id: sortDir
            }
        })

        res.json(allGenres)
    }
}