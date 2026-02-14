import { auth } from "./lib/auth";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { notFound } from "./middleware/not-found";
import { medicineRoutes } from "./modules/medicine/medicine.route";
import { companyRoutes } from "./modules/company/company.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { orderRoutes } from "./modules/order/order.route";
import { cartRoutes } from "./modules/cart/cart.route";
import { sellerRoutes } from "./modules/seller/seller.route";

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.104:3000"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

// medicine route
app.use("/api/seller/medicines", medicineRoutes);
// company route
app.use("/api/seller/company", companyRoutes);
//cart
app.use("/api/carts", cartRoutes);
//order
app.use("/api/orders", orderRoutes);

//seller
app.use("/api/seller/orders", sellerRoutes);
//admin
app.use("/api/admin/users", adminRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("hellow world");
});

app.use(notFound);

export default app;
