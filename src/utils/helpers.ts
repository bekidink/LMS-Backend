import { Response } from "express";

// Utility function to handle errors
export const handleErrorResponse = (
  res: Response,
  message: string,
  error: any,
  statusCode: number = 500
) => {
  res.status(statusCode).json({ message, error });
};
