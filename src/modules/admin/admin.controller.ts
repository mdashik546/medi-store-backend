import type { Request, Response } from "express";
import { catchErrorMessage } from "../../middleware/catch-error-message";
import { adminServices } from "./admin.service";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const adminId = req.user?.id;
    if (!adminId) {
      throw new Error("You are unauthorized!!");
    }
    const result = await adminServices.getAllUser();
    res.status(200).json({
      success: true,
      message: "All users retrieved successfully.",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};
export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const adminId = req.user?.id;
    if (!adminId) {
      throw new Error("You are unauthorized!!");
    }
    const result = await adminServices.getAllOrder();
    res.status(200).json({
      success: true,
      message: "All Orders retrieved successfully.",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = req.user?.id;
    if (!adminId) {
      throw new Error("You are unauthorized!!");
    }
    const result = await adminServices.update(id as string);
    res.status(201).json({
      success: true,
      message: "updated created successfully.",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    catchErrorMessage(res, errorMessage);
  }
};

export const adminControllers = {
  getAllUser,
  update,
  getAllOrder,
};
