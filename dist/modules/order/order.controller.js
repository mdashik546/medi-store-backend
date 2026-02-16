import { orderServices } from "./order.service.js";
import { catchErrorMessage } from "../../middleware/catch-error-message.js";
const createOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new Error("Your are unauthorized!!");
        }
        const result = await orderServices.createOrder(req.body, userId);
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
const getAllOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            throw new Error("Your are unauthorized!!");
        const result = await orderServices.getAllOrder(userId);
        res.status(200).json({
            success: true,
            message: "All orders retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
const singleOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId)
            throw new Error("Your are unauthorized!!");
        const result = await orderServices.singleOrder(id);
        res.status(200).json({
            success: true,
            message: "Order retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId)
            throw new Error("Your are unauthorized!!");
        const result = await orderServices.updateOrderStatus(id, userId);
        res.status(200).json({
            success: true,
            message: "Order cancelled successfully.",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
const reOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId)
            throw new Error("Your are unauthorized!!");
        const result = await orderServices.reOrder(id, userId);
        res.status(200).json({
            success: true,
            message: "Reorder created successfully.",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
export const orderControllers = {
    createOrder,
    getAllOrder,
    singleOrder,
    updateOrderStatus,
    reOrder,
};
