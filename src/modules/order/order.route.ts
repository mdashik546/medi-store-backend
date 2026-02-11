import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware";
import { orderControllers } from "./order.controller";
const router = Router();
router.post("/", middleware(UserRole.CUSTOMER), orderControllers.createOrder);
router.get("/", middleware(UserRole.CUSTOMER), orderControllers.getAllOrder);
router.get("/:id", middleware(UserRole.CUSTOMER), orderControllers.singleOrder);
router.post("/:id/reorder", middleware(UserRole.CUSTOMER), orderControllers.reOrder);
router.patch("/:id", middleware(UserRole.CUSTOMER), orderControllers.updateOrderStatus);

export const orderRoutes = router;
