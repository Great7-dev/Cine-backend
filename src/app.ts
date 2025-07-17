import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import swaggerui from "swagger-ui-express";
import swaggerjsdoc from "swagger-jsdoc";
dotenv.config();

const app = express();
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Movie API",
      version: "1.0.0",
      description: "API for managing movies and genres",
    },
    servers: [
      {
        url: "http://localhost:3001/api/movies",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

const spec = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spec));

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8081",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/genres", movieRoutes);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Movie API is running" });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
