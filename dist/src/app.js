"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
const spec = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:8081",
    credentials: true,
}));
app.use(express_1.default.json());
// Routes
app.use("/api/movies", movieRoutes_1.default);
app.use("/api/genres", movieRoutes_1.default);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Movie API is running" });
});
// Error handling
app.use(errorHandler_1.errorHandler);
// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});
exports.default = app;
