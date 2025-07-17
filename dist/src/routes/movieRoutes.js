"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
/**
 * @swagger
 * /popular:
 *    get:
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
 *     summary: Search for movies
 *     description: Search for movies by title or other criteria.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query string.
 *     responses:
 *       200:
 *         description: A list of movies matching the search criteria.
 *       400:
 *         description: Invalid search query.
 */
/**
 * @swagger
 * /trending/{timeWindow}:
 *    get:
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
 *    get:
 *      summary: Get top-rated movies
 *      description: Retrieve a list of top-rated movies.
 *      responses:
 *        200:
 *          description: A list of top-rated movies.
 */
/**
 * @swagger
 * /upcoming:
 *    get:
 *      summary: Get upcoming movies
 *      description: Retrieve a list of upcoming movies.
 *      responses:
 *        200:
 *          description: A list of upcoming movies.
 */
/**
 * @swagger
 * /genre/{genreId}:
 *    get:
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
 *    get:
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
 *    get:
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
 *    get:
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
 *    get:
 *      summary: Get movie genres
 *      description: Retrieve a list of movie genres.
 *      responses:
 *        200:
 *          description: A list of movie genres.
 */
// Movie routes
router.get("/popular", movieController_1.movieController.getPopularMovies);
// router.get("/discover", movieController.getAll);
router.get("/search", validation_1.validateSearchQuery, movieController_1.movieController.searchMovies);
router.get("/trending/:timeWindow", movieController_1.movieController.getTrendingMovies);
router.get("/top-rated", movieController_1.movieController.getTopRatedMovies);
router.get("/upcoming", movieController_1.movieController.getUpcomingMovies);
router.get("/genre/:genreId", validation_1.validateGenreId, movieController_1.movieController.getMoviesByGenre);
router.get("/:movieId", validation_1.validateMovieId, movieController_1.movieController.getMovieDetails);
router.get("/:movieId/videos", validation_1.validateMovieId, movieController_1.movieController.getMovieVideos);
router.get("/:movieId/credits", validation_1.validateMovieId, movieController_1.movieController.getMovieCredits);
// Genre routes
router.get("/genres", movieController_1.movieController.getGenres);
exports.default = router;
