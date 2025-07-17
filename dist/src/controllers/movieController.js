"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieController = void 0;
const tmdbService_1 = require("../services/tmdbService");
const apiError_1 = require("../utils/apiError");
exports.movieController = {
    // Get popular movies
    getPopularMovies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const data = yield tmdbService_1.tmdbService.getPopularMovies(page);
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    },
    // Search movies
    searchMovies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query.query;
                const page = parseInt(req.query.page) || 1;
                if (!query || query.trim().length === 0) {
                    throw new apiError_1.ApiError(400, "Search query is required");
                }
                const data = yield tmdbService_1.tmdbService.searchMovies(query, page);
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    },
    // Get movie details
    getMovieDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieId = parseInt(req.params.movieId);
                const data = yield tmdbService_1.tmdbService.getMovieDetails(movieId);
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    },
    // Get movie videos
    getMovieVideos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieId = parseInt(req.params.movieId);
                const data = yield tmdbService_1.tmdbService.getMovieVideos(movieId);
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    },
    // Get movie credits
    getMovieCredits(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieId = parseInt(req.params.movieId);
                const data = yield tmdbService_1.tmdbService.getMovieCredits(movieId);
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    },
    // Get movies by genre
    getMoviesByGenre(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genreId = parseInt(req.params.genreId);
                const page = parseInt(req.query.page) || 1;
                const data = yield tmdbService_1.tmdbService.getMoviesByGenre(genreId, page);
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    },
    // Get all genres
    getGenres(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield tmdbService_1.tmdbService.getGenres();
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    },
    // Get trending movies
    getTrendingMovies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timeWindow = req.params.timeWindow;
                const page = parseInt(req.query.page) || 1;
                if (!["day", "week"].includes(timeWindow)) {
                    throw new apiError_1.ApiError(400, 'Time window must be "day" or "week"');
                }
                const data = yield tmdbService_1.tmdbService.getTrendingMovies(timeWindow, page);
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    },
    // Get top rated movies
    getTopRatedMovies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const data = yield tmdbService_1.tmdbService.getTopRatedMovies(page);
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    },
    // Get upcoming movies
    getUpcomingMovies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const data = yield tmdbService_1.tmdbService.getUpcomingMovies(page);
                res.json(data);
            }
            catch (error) {
                next(error);
            }
        });
    },
};
