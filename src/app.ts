import { auth } from "./lib/auth.js";
import express, { type Application, type Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { notFound } from "./middleware/not-found.js";
import { medicineRoutes } from "./modules/medicine/medicine.route.js";
import { companyRoutes } from "./modules/company/company.route.js";
import { adminRoutes } from "./modules/admin/admin.route.js";
import { orderRoutes } from "./modules/order/order.route.js";
import { cartRoutes } from "./modules/cart/cart.route.js";
import { sellerRoutes } from "./modules/seller/seller.route.js";

const app: Application = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://medi-store-frontend-pi.vercel.app",
      "http://localhost:3000",
    ],
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
app.get("/", (_, res: Response) => {
  res.send("hellow world");
});

app.use(notFound);

export default app;
