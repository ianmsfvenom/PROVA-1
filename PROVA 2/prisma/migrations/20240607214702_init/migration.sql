-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "accesstoken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token_string" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL,
    CONSTRAINT "accesstoken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "genre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "release_date" TEXT NOT NULL,
    "poster_url" TEXT NOT NULL,
    "trailer_url" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,
    CONSTRAINT "movie_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "review_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "artits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "biography" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "credit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movie_id" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    CONSTRAINT "credit_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "credit_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "credit_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "reviewevaluation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "review_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "positive" BOOLEAN NOT NULL,
    CONSTRAINT "reviewevaluation_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "review" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reviewevaluation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "accesstoken_user_id_key" ON "accesstoken"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_genre_id_key" ON "movie"("genre_id");
