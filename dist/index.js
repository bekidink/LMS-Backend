"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerkClient = void 0;
const db_1 = __importDefault(require("./utils/db"));
const express_1 = require("@clerk/express");
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
require("dotenv").config();
const server = http_1.default.createServer(app_1.app);
exports.clerkClient = (0, express_1.createClerkClient)({
    secretKey: process.env.CLERK_SECRET_KEY,
});
server.listen(process.env.PORT, () => {
    console.log(`Server is connected with port ${process.env.PORT}`);
    (0, db_1.default)();
});
