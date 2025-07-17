import express from "express";
import { movieController } from "../controllers/movieController";
import {
  validateMovieId,
  validateSearchQuery,
  validateGenreId,
  validatePage,
} from "../middleware/validation";

const router = express.Router();
/**
 * @swagger
 * /popular:
 *   get:
 *      summary: Get popular movies
 *      description: Retrieve a list of popular movies.
 *      responses:
 *         200:
 *            description: A list of popular movies.
 */
/**
 * @swagger
 * /search:
 *   get:
 *      summary: Search for movies
 *      description: Search for movies by title or other criteria.
 *      parameters:
 *        - in: query
 *          name: query
 *          required: true
 *         schema:
 *          type: string
 *         description: The search query string.
 *     responses:
 *        200:
 *          description: A list of movies matching the search criteria.
 *        400:
 *          description: Invalid search query.
 */
/**
 * @swagger
 * /trending/{timeWindow}:
 *   get:
 *      summary: Get trending movies
 *      description: Retrieve a list of trending movies for a specific time window.
 *      parameters:
 *        - in: path
 *          name: timeWindow
 *          required: true
 *          schema:
 *            type: string
 *            enum: [day, week]
 *          description: The time window for trending movies (day or week).
 *      responses:
 *        200:
 *          description: A list of trending movies.
 */
/**
 * @swagger
 * /top-rated:
 *   get:
 *      summary: Get top-rated movies
 *      description: Retrieve a list of top-rated movies.
 *      responses:
 *        200:
 *          description: A list of top-rated movies.
 */
/**
 * @swagger
 * /upcoming:
 *   get:
 *      summary: Get upcoming movies
 *      description: Retrieve a list of upcoming movies.
 *      responses:
 *        200:
 *          description: A list of upcoming movies.
 */
/**
 * @swagger
 * /genre/{genreId}:
 *   get:
 *      summary: Get movies by genre
 *      description: Retrieve a list of movies for a specific genre.
 *      parameters:
 *        - in: path
 *          name: genreId
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the genre.
 *      responses:
 *        200:
 *          description: A list of movies for the specified genre.
 */
/**
 * @swagger
 * /{movieId}:
 *   get:
 *      summary: Get movie details
 *      description: Retrieve detailed information about a specific movie.
 *      parameters:
 *        - in: path
 *          name: movieId
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the movie.
 *      responses:
 *        200:
 *          description: Detailed information about the specified movie.
 */
/**
 * @swagger
 * /{movieId}/videos:
 *   get:
 *      summary: Get movie videos
 *      description: Retrieve videos related to a specific movie.
 *      parameters:
 *        - in: path
 *          name: movieId
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the movie.
 *      responses:
 *        200:
 *          description: A list of videos related to the specified movie.
 */
/**
 * @swagger
 * /{movieId}/credits:
 *   get:
 *      summary: Get movie credits
 *      description: Retrieve credits (cast and crew) for a specific movie.
 *      parameters:
 *        - in: path
 *          name: movieId
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the movie.
 *      responses:
 *        200:
 *         description: Credits (cast and crew) for the specified movie.
 */
/**
 * @swagger
 * /genres:
 *   get:
 *      summary: Get movie genres
 *      description: Retrieve a list of movie genres.
 *      responses:
 *        200:
 *          description: A list of movie genres.
 */

// Movie routes
router.get("/popular", movieController.getPopularMovies);
// router.get("/discover", movieController.getAll);
router.get("/search", validateSearchQuery, movieController.searchMovies);
router.get("/trending/:timeWindow", movieController.getTrendingMovies);
router.get("/top-rated", movieController.getTopRatedMovies);
router.get("/upcoming", movieController.getUpcomingMovies);
router.get(
  "/genre/:genreId",
  validateGenreId,
  movieController.getMoviesByGenre
);
router.get("/:movieId", validateMovieId, movieController.getMovieDetails);
router.get("/:movieId/videos", validateMovieId, movieController.getMovieVideos);
router.get(
  "/:movieId/credits",
  validateMovieId,
  movieController.getMovieCredits
);
// Genre routes
router.get("/genres", movieController.getGenres);

export default router;
