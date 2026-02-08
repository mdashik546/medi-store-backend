import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware";
import { adminControllers } from "./admin.controller";

const router = Router();
router.get("/", middleware(UserRole.ADMIN), adminControllers.getAllUser);
router.patch("/:id", middleware(UserRole.ADMIN), adminControllers.update);
export const adminRoutes = router;
