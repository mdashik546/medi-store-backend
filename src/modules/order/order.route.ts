import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware";
import { orderControllers } from "./order.controller";
const router = Router();
router.post("/", middleware(UserRole.CUSTOMER), orderControllers.createOrder);
router.get("/", middleware(UserRole.CUSTOMER), orderControllers.getAllOrder);
router.get("/:id", middleware(UserRole.CUSTOMER), orderControllers.singleOrder);

export const orderRoutes = router;
