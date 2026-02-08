import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware";
import { orderControllers } from "./order.controller";
const router = Router();
router.post("/", middleware(UserRole.CUSTOMER), orderControllers.createOrder);

export const orderRoutes = router;
