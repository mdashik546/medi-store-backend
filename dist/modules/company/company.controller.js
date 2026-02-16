import { companyServices } from "./company.service.js";
import { catchErrorMessage } from "../../middleware/catch-error-message.js";
export const createCompany = async (req, res) => {
    try {
        const sellerId = req.user?.id;
        if (!sellerId) {
            throw new Error("You are unauthorized!!");
        }
        const result = await companyServices.createCompany(req.body);
        res.status(201).json({
            success: true,
            message: "Company created successfully.",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        catchErrorMessage(res, errorMessage);
    }
};
export const companyControllers = {
    createCompany,
};
