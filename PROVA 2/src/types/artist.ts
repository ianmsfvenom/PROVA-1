export type GetAllArtistsParam = {
    page?: number,
    pageSize?: number,
    sortDir?: 'asc' | 'desc'
}

export type SearchArtistParam = {
    id: string
}