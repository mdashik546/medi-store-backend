import type { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
const createOrder = async (
  data: Omit<Order, "authorId" | "createdAt" | "updatedAt">,
  authorId: string,
) => {
  return await prisma.$transaction(async (tx) => {
    //get allcarts
    const cartItems = await tx.cart.findMany({
      where: { authorId },
      include: { medicine: true },
    });

    if (cartItems.length === 0) {
      throw new Error("cart is empty");
    }

    // stock check
    cartItems.forEach((item) => {
      if (item?.quantity > item?.medicine?.stock) {
        throw new Error(`${item.medicine.name} out of stock`);
      }
    });

    //order create
    const order = await tx.order.create({
      data: {
        ...data,
        authorId,
        total: cartItems.reduce(
          (sum, item) => sum + item.quantity * item.medicine.price,
          0,
        ),
      },
    });

    // order items
    await tx.orderItem.createMany({
      data: cartItems?.map((item) => ({
        orderId: order.id,
        medicineId: item?.medicineId,
        quantity: item?.quantity,
        price: item?.medicine?.price,
      })),
    });

    //  Stock update
    for (const item of cartItems) {
      await tx.medicine.update({
        where: { id: item.medicineId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    //delete
    await tx.cart.deleteMany({ where: { authorId } });
    return order;
  });
};

const getAllOrder = async (authorId:string) => {
  return await prisma.order.findMany({
    where: { authorId },
    orderBy: {
      createdAt: "desc",
    },
  });
};
const singleOrder = async (id: string) => {
  const orderInfo = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  if (!orderInfo) {
    throw new Error("orderId is Invalid!!");
  }

  return orderInfo;
};

export const orderServices = {
  createOrder,
  getAllOrder,
  singleOrder,
};
