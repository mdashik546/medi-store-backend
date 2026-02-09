import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware";
import { sellerControllers } from "./seller.controller";
const router = Router();
router.get("/", middleware(UserRole.SELLER), sellerControllers.getAllOrder);
router.patch("/:id", middleware(UserRole.SELLER), sellerControllers.update);

export const sellerRoutes = router;
