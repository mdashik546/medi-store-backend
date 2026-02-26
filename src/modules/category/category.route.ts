import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware.js";
import { categoryControllers } from "./category.controller.js";

const router = Router();
router.post("/", middleware(UserRole.SELLER), categoryControllers.createCategory);
export const categoryRoutes = router;
