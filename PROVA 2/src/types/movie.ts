export type SearchMovieParams = {
    id: string
}

export type GetAllMoviesParams = {
    page?: number,
    pageSize?: number,
    sortDir?: 'asc' | 'desc'
    sortBy?: 'title' | 'releaseDate'
}