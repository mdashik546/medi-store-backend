import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware";
import { cartControllers } from "./cart.controller";

const router = Router();
router.post("/:medicineId", middleware(UserRole.CUSTOMER), cartControllers.createCart);
export const cartRoutes = router;
