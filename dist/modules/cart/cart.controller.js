import { catchErrorMessage } from "../../middleware/catch-error-message.js";
import { cartServices } from "./cart.service.js";
export const createCart = async (req, res) => {
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
        const result = await cartServices.createCart(medicineId, authorId, quantity);
        res.status(201).json({
            success: true,
            message: "Cart created successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
const getAllCart = async (req, res) => {
    try {
        const authorId = req.user?.id;
        if (!authorId) {
            throw new Error("You are unauthorized!");
        }
        const result = await cartServices.getAllCart(authorId);
        res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
const singleCartDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const authorId = req.user?.id;
        if (!authorId) {
            throw new Error("You are unauthorized!");
        }
        const result = await cartServices.singleCartDelete(id, authorId);
        res.status(200).json({
            success: true,
            message: "Cart delete successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
const deleteAllCart = async (req, res) => {
    try {
        const authorId = req.user?.id;
        if (!authorId) {
            throw new Error("You are unauthorized!");
        }
        const result = await cartServices.deleteAllCart(authorId);
        res.status(200).json({
            success: true,
            message: "All Cart deleted successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
export const cartControllers = {
    createCart,
    getAllCart,
    singleCartDelete,
    deleteAllCart,
};
