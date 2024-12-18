"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserMetadata = void 0;
const index_1 = require("../index");
// Service to update the user metadata
const updateUserMetadata = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update user metadata using Clerk's updateUserMetadata method
        const updatedUser = yield index_1.clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                userType: userData.publicMetadata.userType,
                settings: userData.publicMetadata.settings,
            },
        });
        return updatedUser;
    }
    catch (error) {
        throw new Error("Error updating user metadata: " + error.message);
    }
});
exports.updateUserMetadata = updateUserMetadata;
