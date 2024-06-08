export type AddReviewBody = {
    movieId: string
    stars: number
    content: string
}

export type SearchReviewParam = {
    movieId?: string
    page?: number
    pageSize?: number
    sortDir?: 'asc' | 'desc'
    sortBy?: 'stars' | 'createdAt'
}

export type DeleteReviewParam = {
    movieId: string
}