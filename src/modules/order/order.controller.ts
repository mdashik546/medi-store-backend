import { orderServices } from "./order.service";
import type { Request, Response } from "express";
import { catchErrorMessage } from "../../middleware/catch-error-message";
import { UserRole } from "../../middleware/middleware";

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error("Your are unauthorized!!");
    }
    const result = await orderServices.createOrder(req.body, userId as string);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new Error("Your are unauthorized!!");
    const result = await orderServices.getAllOrder(userId as string);
    res.status(200).json({
      success: true,
      message: "All orders retrieved successfully.",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};
const singleOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) throw new Error("Your are unauthorized!!");
    const result = await orderServices.singleOrder(id as string);
    res.status(200).json({
      success: true,
      message: "Order retrieved successfully.",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};
const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) throw new Error("Your are unauthorized!!");
    const result = await orderServices.updateOrderStatus(id as string,userId);
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};

export const orderControllers = {
  createOrder,
  getAllOrder,
  singleOrder,
  updateOrderStatus,
};
