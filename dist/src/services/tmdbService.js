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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmdbService = void 0;
const axios_1 = __importDefault(require("axios"));
const apiError_1 = require("../utils/apiError");
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY || "d6bb8ba451f473944c8699c1c49612d5";
if (!TMDB_API_KEY) {
    throw new Error("TMDB_API_KEY environment variable is required");
}
const tmdbApi = axios_1.default.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
    timeout: 10000,
});
// Add response interceptor for error handling
tmdbApi.interceptors.response.use((response) => response, (error) => {
    if (error.response) {
        // TMDB API error
        const { status, data } = error.response;
        throw new apiError_1.ApiError(status, data.status_message || "TMDB API error");
    }
    else if (error.request) {
        // Network error
        throw new apiError_1.ApiError(503, "Unable to connect to movie database");
    }
    else {
        // Other error
        throw new apiError_1.ApiError(500, "Internal server error");
    }
});
exports.tmdbService = {
    getAll(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get("/discover/movie", {
                params: { page },
            });
            return response.data;
        });
    },
    // Get popular movies
    getPopularMovies(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get("/movie/popular", {
                params: { page },
            });
            return response.data;
        });
    },
    // Search movies
    searchMovies(query, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get("/search/movie", {
                params: { query, page },
            });
            return response.data;
        });
    },
    // Get movie details
    getMovieDetails(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get(`/movie/${movieId}`, {
                params: {
                    append_to_response: "videos,credits,images,keywords,recommendations,similar",
                },
            });
            return response.data;
        });
    },
    // Get movie videos
    getMovieVideos(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get(`/movie/${movieId}/videos`);
            return response.data.results;
        });
    },
    // Get movie credits
    getMovieCredits(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get(`/movie/${movieId}/credits`);
            return response.data;
        });
    },
    // Get movies by genre
    getMoviesByGenre(genreId, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get("/discover/movie", {
                params: {
                    with_genres: genreId,
                    page,
                    sort_by: "popularity.desc",
                },
            });
            return response.data;
        });
    },
    // Get all genres
    getGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get("/genre/movie/list");
            return response.data.genres;
        });
    },
    // Get trending movies
    getTrendingMovies(timeWindow = "week", page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get(`/trending/movie/${timeWindow}`, {
                params: { page },
            });
            return response.data;
        });
    },
    // Get top rated movies
    getTopRatedMovies(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get("/movie/top_rated", {
                params: { page },
            });
            return response.data;
        });
    },
    // Get upcoming movies
    getUpcomingMovies(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get("/movie/upcoming", {
                params: { page },
            });
            return response.data;
        });
    },
    // Get now playing movies
    getNowPlayingMovies(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tmdbApi.get("/movie/now_playing", {
                params: { page },
            });
            return response.data;
        });
    },
};
