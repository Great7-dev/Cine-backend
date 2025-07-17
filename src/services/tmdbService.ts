import axios from "axios";
import { ApiError } from "../utils/apiError";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY =
  process.env.TMDB_API_KEY || "d6bb8ba451f473944c8699c1c49612d5";

if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY environment variable is required");
}

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
  timeout: 10000,
});

// Add response interceptor for error handling
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // TMDB API error
      const { status, data } = error.response;
      throw new ApiError(status, data.status_message || "TMDB API error");
    } else if (error.request) {
      // Network error
      throw new ApiError(503, "Unable to connect to movie database");
    } else {
      // Other error
      throw new ApiError(500, "Internal server error");
    }
  }
);

export const tmdbService = {
  async getAll(page: number = 1) {
    const response = await tmdbApi.get("/discover/movie", {
      params: { page },
    });
    return response.data;
  },
  // Get popular movies
  async getPopularMovies(page: number = 1) {
    const response = await tmdbApi.get("/movie/popular", {
      params: { page },
    });
    return response.data;
  },

  // Search movies
  async searchMovies(query: string, page: number = 1) {
    const response = await tmdbApi.get("/search/movie", {
      params: { query, page },
    });
    return response.data;
  },

  // Get movie details
  async getMovieDetails(movieId: number) {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response:
          "videos,credits,images,keywords,recommendations,similar",
      },
    });
    return response.data;
  },

  // Get movie videos
  async getMovieVideos(movieId: number) {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`);
    return response.data.results;
  },

  // Get movie credits
  async getMovieCredits(movieId: number) {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`);
    return response.data;
  },

  // Get movies by genre
  async getMoviesByGenre(genreId: number, page: number = 1) {
    const response = await tmdbApi.get("/discover/movie", {
      params: {
        with_genres: genreId,
        page,
        sort_by: "popularity.desc",
      },
    });
    return response.data;
  },

  // Get all genres
  async getGenres() {
    const response = await tmdbApi.get("/genre/movie/list");
    return response.data.genres;
  },

  // Get trending movies
  async getTrendingMovies(
    timeWindow: "day" | "week" = "week",
    page: number = 1
  ) {
    const response = await tmdbApi.get(`/trending/movie/${timeWindow}`, {
      params: { page },
    });
    return response.data;
  },

  // Get top rated movies
  async getTopRatedMovies(page: number = 1) {
    const response = await tmdbApi.get("/movie/top_rated", {
      params: { page },
    });
    return response.data;
  },

  // Get upcoming movies
  async getUpcomingMovies(page: number = 1) {
    const response = await tmdbApi.get("/movie/upcoming", {
      params: { page },
    });
    return response.data;
  },

  // Get now playing movies
  async getNowPlayingMovies(page: number = 1) {
    const response = await tmdbApi.get("/movie/now_playing", {
      params: { page },
    });
    return response.data;
  },
};
