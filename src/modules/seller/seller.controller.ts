import type { Request, Response } from "express";
import { catchErrorMessage } from "../../middleware/catch-error-message.js";
import { sellerServices } from "./seller.service.js";

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error("Your are unauthorized!!");
    }
    const result = await sellerServices.getAllOrder();
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
const updateOrderStatus = async (req: Request, res: Response) => {
  console.log(req.body.orderStatus);
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      throw new Error("Your are unauthorized!!");
    }
    const result = await sellerServices.updateOrderStatus(
      id as string,
      req.body.orderStatus,
    );
    res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};
export const sellerControllers = {
  getAllOrder,
  updateOrderStatus,
};
