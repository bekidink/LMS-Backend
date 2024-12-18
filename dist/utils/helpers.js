"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = void 0;
// Utility function to handle errors
const handleErrorResponse = (res, message, error, statusCode = 500) => {
    res.status(statusCode).json({ message, error });
};
exports.handleErrorResponse = handleErrorResponse;
