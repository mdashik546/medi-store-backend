import type { Request, Response } from "express";
import { catchErrorMessage } from "../../middleware/catch-error-message";
import { cartServices } from "./cart.service";

export const createCart = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.query;
    const authorId = req.user?.id;
    if (!authorId) {
      throw new Error("You are unauthorized!!");
    }
    const result = await cartServices.createCart(req.body, authorId as string);
    res.status(201).json({
      success: true,
      message: "cart created successfully.",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};

export const cartControllers = {
  createCart,
};
