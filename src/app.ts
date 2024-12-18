require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
// import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";

// import { rateLimit } from "express-rate-limit";
import courseRoutes from "./routes/courseRoutes";
import userClerkRoutes from "./routes/useClerkRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userCourseProgressRoutes from "./routes/userCourseProgressRoutes";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// body parser
app.use(express.json({ limit: "50mb" }));

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
app.use(
  "/api/v1",
  courseRoutes,
  userClerkRoutes,
  transactionRoutes,
  userCourseProgressRoutes,
  
);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    succcess: true,
    message: "API is working",
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// middleware calls
// app.use(limiter);
app.use(ErrorMiddleware);
