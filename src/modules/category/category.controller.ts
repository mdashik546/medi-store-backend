import type { Request, Response } from "express";
import { catchErrorMessage } from "../../middleware/catch-error-message.js";
import { categoryServices } from "./category.service.js";

const createCategory = async (req: Request, res: Response) => {
  try {
    const sellerId = req.user?.id;
    if (!sellerId) {
      throw new Error("You are unauthorized!!");
    }
    const result = await categoryServices.createCategory(req.body);
    res.status(201).json({
      success: true,
      message: "category created successfully.",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};

export const categoryControllers = {
  createCategory,
};
