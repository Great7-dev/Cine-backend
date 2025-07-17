import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

export const validateMovieId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const movieId = parseInt(req.params.movieId);

  if (isNaN(movieId) || movieId <= 0) {
    throw new ApiError(400, "Invalid movie ID");
  }

  next();
};

export const validateSearchQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query.query as string;

  if (!query || query.trim().length === 0) {
    throw new ApiError(400, "Search query is required");
  }

  if (query.length > 100) {
    throw new ApiError(400, "Search query is too long");
  }

  next();
};

export const validateGenreId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const genreId = parseInt(req.params.genreId);

  if (isNaN(genreId) || genreId <= 0) {
    throw new ApiError(400, "Invalid genre ID");
  }

  next();
};

export const validatePage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string);

  if (page && (isNaN(page) || page <= 0 || page > 1000)) {
    throw new ApiError(400, "Page must be between 1 and 1000");
  }

  next();
};
