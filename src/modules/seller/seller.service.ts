import type { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllOrder = async () => {
  return await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
const update = async (id: string, status: OrderStatus) => {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id },
    select: {
      orderStatus: true,
    },
  });
  if (order.orderStatus === status) {
    throw new Error(
      `Order is already in status '${status}'. No update needed.`,
    );
  }

  return await prisma.order.update({
    where: { id },
    data: {
      orderStatus: status,
    },
  });
};

export const sellerServices = {
  getAllOrder,
  update,
};
