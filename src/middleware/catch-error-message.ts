import type { Response } from "express";

export const catchErrorMessage = (res: Response, error: string) => {
  res.status(500).json({
    success: false,
    message: error,
  });
};
