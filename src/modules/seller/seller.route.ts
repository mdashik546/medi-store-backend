import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware.js";
import { sellerControllers } from "./seller.controller.js";
const router = Router();
router.get("/", middleware(UserRole.SELLER), sellerControllers.getAllOrder);
router.patch("/:id", middleware(UserRole.SELLER), sellerControllers.updateOrderStatus);

export const sellerRoutes = router;
