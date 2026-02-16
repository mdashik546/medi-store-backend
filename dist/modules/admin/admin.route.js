import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware.js";
import { adminControllers } from "./admin.controller.js";
const router = Router();
router.get("/", middleware(UserRole.ADMIN), adminControllers.getAllUser);
router.get("/orders", middleware(UserRole.ADMIN), adminControllers.getAllOrder);
router.patch("/:id", middleware(UserRole.ADMIN), adminControllers.update);
export const adminRoutes = router;
