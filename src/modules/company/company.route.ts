import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware";
import { companyControllers } from "./company.controller";

const router = Router();
router.post("/", middleware(UserRole.SELLER), companyControllers.createCompany);
export const companyRoutes = router;
