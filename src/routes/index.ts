import { Response, Router } from "express";
import { medicineRoutes } from "../modules/medicine/medicine.route.js";
import { categoryRoutes } from "../modules/category/category.route.js";
import { cartRoutes } from "../modules/cart/cart.route.js";
import { orderRoutes } from "../modules/order/order.route.js";
import { sellerRoutes } from "../modules/seller/seller.route.js";
import { adminRoutes } from "../modules/admin/admin.route.js";

const router = Router();

// medicine route
router.use("/seller/medicines", medicineRoutes);
// category route
router.use("/seller/categories", categoryRoutes);
//cart
router.use("/carts", cartRoutes);
//order
router.use("/orders", orderRoutes);

//seller
router.use("/seller/orders", sellerRoutes);
//admin
router.use("/admin/users", adminRoutes);

router.get("/", (_, res: Response) => {
  res.send("api is running...");
});

export const indexRoutes = router;
