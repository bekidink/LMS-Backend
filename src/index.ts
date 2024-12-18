
import connectDB from "./utils/db";
import {
  createClerkClient,
} from "@clerk/express";

import http from "http";

import { app } from "./app";
require("dotenv").config();
const server = http.createServer(app);
export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

server.listen(process.env.PORT, () => {
  console.log(`Server is connected with port ${process.env.PORT}`);
  connectDB();
});
