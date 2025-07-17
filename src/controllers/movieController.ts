import { Request, Response, NextFunction } from "express";
import { tmdbService } from "../services/tmdbService";
import { ApiError } from "../utils/apiError";

export const movieController = {
  // Get popular movies
  async getPopularMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const data = await tmdbService.getPopularMovies(page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // Search movies
  async searchMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query.query as string;
      const page = parseInt(req.query.page as string) || 1;

      if (!query || query.trim().length === 0) {
        throw new ApiError(400, "Search query is required");
      }

      const data = await tmdbService.searchMovies(query, page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // Get movie details
  async getMovieDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = parseInt(req.params.movieId);
      const data = await tmdbService.getMovieDetails(movieId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // Get movie videos
  async getMovieVideos(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = parseInt(req.params.movieId);
      const data = await tmdbService.getMovieVideos(movieId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // Get movie credits
  async getMovieCredits(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = parseInt(req.params.movieId);
      const data = await tmdbService.getMovieCredits(movieId);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // Get movies by genre
  async getMoviesByGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const genreId = parseInt(req.params.genreId);
      const page = parseInt(req.query.page as string) || 1;
      const data = await tmdbService.getMoviesByGenre(genreId, page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // Get all genres
  async getGenres(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await tmdbService.getGenres();
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // Get trending movies
  async getTrendingMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const timeWindow = req.params.timeWindow as "day" | "week";
      const page = parseInt(req.query.page as string) || 1;

      if (!["day", "week"].includes(timeWindow)) {
        throw new ApiError(400, 'Time window must be "day" or "week"');
      }

      const data = await tmdbService.getTrendingMovies(timeWindow, page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // Get top rated movies
  async getTopRatedMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const data = await tmdbService.getTopRatedMovies(page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  // Get upcoming movies
  async getUpcomingMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const data = await tmdbService.getUpcomingMovies(page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
};
