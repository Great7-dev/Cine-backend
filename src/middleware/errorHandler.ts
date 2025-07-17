import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("API Error:", {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      statusCode: error.statusCode,
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    message: "Internal server error",
    statusCode: 500,
  });
};
