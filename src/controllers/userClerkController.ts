import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { handleErrorResponse } from "../utils/helpers";

// Controller to update user metadata
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const userData = req.body;

  try {
    const updatedUser = await userService.updateUserMetadata(userId, userData);
    res.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    handleErrorResponse(res, "Error updating user", error);
  }
};
