import { Router } from "express";
import { medicineControllers } from "./medicine.controller.js";
import { middleware, UserRole } from "../../middleware/middleware.js";
const router = Router();
router.post(
  "/",
  middleware(UserRole.SELLER),
  medicineControllers.createMedicine,
);
router.get("/", medicineControllers.getMedicine);
router.get("/:id", medicineControllers.singleMedicine);
router.patch(
  "/:id",
  middleware(UserRole.SELLER),
  medicineControllers.updateMedicine,
);
router.delete(
  "/:id",
  middleware(UserRole.SELLER),
  medicineControllers.deleteMedicine,
);

export const medicineRoutes = router;
