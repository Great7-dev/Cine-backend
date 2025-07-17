"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiError_1 = require("../utils/apiError");
const errorHandler = (error, req, res, next) => {
    console.error("API Error:", {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
    });
    if (error instanceof apiError_1.ApiError) {
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
exports.errorHandler = errorHandler;
