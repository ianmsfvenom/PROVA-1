import { NextFunction, Request, Response } from "express";
import { GetAllArtistsParam, SearchArtistParam } from "../types/artist";
import prisma from "../config/prisma";
import { host } from "../config/app";
import ApiError from "../helpers/ApiErrorHelper";

export default new class ArtistController {
    public async getAllArtists(req: Request<GetAllArtistsParam>, res: Response, next: NextFunction) {
        var { page, pageSize, sortDir } = req.params

        if(!page || typeof page != 'number') page = 1
        if(!pageSize || typeof page != 'number') pageSize = 10
        if(!sortDir || typeof page != 'string') sortDir = 'asc'

        const allArtists = (await prisma.artist.findMany({
            orderBy: {
                id: sortDir
            },
            take: pageSize,
            skip: page
        })).map(value => ({
            id: value.id,
            name: value.name,
            photoUrl: value.photo_url,
            singlePageUrl: `${host}/artists/${value.id}`
        }))

        res.json(allArtists)
    }

    public async searchArtist(req: Request<SearchArtistParam>, res: Response, next: NextFunction) {
        const { id } = req.params

        const findArtist = await prisma.artist.findFirst({ where: { id }})
        if(!findArtist) return next(new ApiError('Artist not founded', 404));

        res.json(findArtist)
    }
}