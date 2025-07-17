"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePage = exports.validateGenreId = exports.validateSearchQuery = exports.validateMovieId = void 0;
const apiError_1 = require("../utils/apiError");
const validateMovieId = (req, res, next) => {
    const movieId = parseInt(req.params.movieId);
    if (isNaN(movieId) || movieId <= 0) {
        throw new apiError_1.ApiError(400, "Invalid movie ID");
    }
    next();
};
exports.validateMovieId = validateMovieId;
const validateSearchQuery = (req, res, next) => {
    const query = req.query.query;
    if (!query || query.trim().length === 0) {
        throw new apiError_1.ApiError(400, "Search query is required");
    }
    if (query.length > 100) {
        throw new apiError_1.ApiError(400, "Search query is too long");
    }
    next();
};
exports.validateSearchQuery = validateSearchQuery;
const validateGenreId = (req, res, next) => {
    const genreId = parseInt(req.params.genreId);
    if (isNaN(genreId) || genreId <= 0) {
        throw new apiError_1.ApiError(400, "Invalid genre ID");
    }
    next();
};
exports.validateGenreId = validateGenreId;
const validatePage = (req, res, next) => {
    const page = parseInt(req.query.page);
    if (page && (isNaN(page) || page <= 0 || page > 1000)) {
        throw new apiError_1.ApiError(400, "Page must be between 1 and 1000");
    }
    next();
};
exports.validatePage = validatePage;
