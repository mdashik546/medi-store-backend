import { Router } from "express";
import { middleware, UserRole } from "../../middleware/middleware";
import { cartControllers } from "./cart.controller";

const router = Router();
router.get("/", middleware(UserRole.CUSTOMER), cartControllers.getAllCart);
router.post(
  "/:medicineId",
  middleware(UserRole.CUSTOMER),
  cartControllers.createCart,
);
export const cartRoutes = router;
