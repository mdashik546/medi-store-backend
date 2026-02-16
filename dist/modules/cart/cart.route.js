import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware.js";
import { cartControllers } from "./cart.controller.js";
const router = Router();
router.get("/", middleware(UserRole.CUSTOMER), cartControllers.getAllCart);
router.post("/:medicineId", middleware(UserRole.CUSTOMER), cartControllers.createCart);
router.delete("/:id", middleware(UserRole.CUSTOMER), cartControllers.singleCartDelete);
router.delete("/", middleware(UserRole.CUSTOMER), cartControllers.deleteAllCart);
export const cartRoutes = router;
