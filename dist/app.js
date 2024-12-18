"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
// import cookieParser from "cookie-parser";
const error_1 = require("./middleware/error");
// import { rateLimit } from "express-rate-limit";
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const useClerkRoutes_1 = __importDefault(require("./routes/useClerkRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const userCourseProgressRoutes_1 = __importDefault(require("./routes/userCourseProgressRoutes"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app.use(express_1.default.json());
exports.app.use((0, helmet_1.default)());
exports.app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
exports.app.use((0, morgan_1.default)("common"));
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.app.use((0, cors_1.default)());
// body parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
// cookie parser
// app.use(cookieParser());
// cors => cross origin resource sharing
// api requests limit
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: "draft-7",
//   legacyHeaders: false,
// });
// routes
exports.app.use("/api/v1", courseRoutes_1.default, useClerkRoutes_1.default, transactionRoutes_1.default, userCourseProgressRoutes_1.default);
// testing api
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        succcess: true,
        message: "API is working",
    });
});
// unknown route
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// middleware calls
// app.use(limiter);
exports.app.use(error_1.ErrorMiddleware);
