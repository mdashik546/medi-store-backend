import type { Request, Response } from "express";
import { catchErrorMessage } from "../../middleware/catch-error-message";
import { cartServices } from "./cart.service";

export const createCart = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.params;
    const { quantity } = req.body;
    const authorId = req.user?.id;

    if (!authorId) {
      throw new Error("You are unauthorized!");
    }

    if (!medicineId) {
      throw new Error("Medicine id is required");
    }

    const result = await cartServices.createCart(
      medicineId as string,
      authorId,
      quantity,
    );

    res.status(201).json({
      success: true,
      message: "Cart created successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};
const getAllCart = async (req: Request, res: Response) => {
  try {
    const authorId = req.user?.id;
    if (!authorId) {
      throw new Error("You are unauthorized!");
    }

    const result = await cartServices.getAllCart();

    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
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
  getAllCart,
};
