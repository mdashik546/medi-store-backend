import { medicineServices } from "./medicine.service.js";
import { UserRole } from "../../middleware/middleware.js";
import { catchErrorMessage } from "../../middleware/catch-error-message.js";
const createMedicine = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new Error("Your are unauthorized!!");
        }
        const expired = new Date(req?.body?.expiryDate);
        if (isNaN(expired.getTime())) {
            throw new Error("Invalid expiry date! Use YYYY-MM-DD");
        }
        const result = await medicineServices.createMedicine(req.body, userId);
        res.status(201).json({
            success: true,
            message: "Medicine created Successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
const getMedicine = async (req, res) => {
    try {
        const result = await medicineServices.getMedicine();
        res.status(200).json({
            success: true,
            message: "All medicines retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
const singleMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await medicineServices.singleMedicine(id);
        res.status(200).json({
            success: true,
            message: "Medicine retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
const updateMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const isSeller = user?.role === UserRole.SELLER;
        if (!user) {
            throw new Error("Your are unauthorized!!");
        }
        const result = await medicineServices.updateMedicine(id, req.body, user?.id, isSeller);
        res.status(200).json({
            success: true,
            message: "Medicine updated Successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "update failed!!";
        catchErrorMessage(res, errorMessage);
    }
};
const deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const isSeller = user?.role === UserRole.SELLER;
        if (!user) {
            throw new Error("Your are unauthorized!!");
        }
        const result = await medicineServices.deleteMedicine(id, user?.id, isSeller);
        res.status(200).json({
            success: true,
            message: "Medicine deleted Successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "delete failed";
        catchErrorMessage(res, errorMessage);
    }
};
export const medicineControllers = {
    createMedicine,
    getMedicine,
    singleMedicine,
    updateMedicine,
    deleteMedicine,
};
