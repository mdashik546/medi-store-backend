import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware.js";
import { companyControllers } from "./company.controller.js";

const router = Router();
router.post("/", middleware(UserRole.SELLER), companyControllers.createCompany);
export const companyRoutes = router;
