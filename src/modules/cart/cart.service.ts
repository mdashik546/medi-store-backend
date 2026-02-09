import { prisma } from "../../lib/prisma";

export const createCart = async (
  medicineId: string,
  authorId: string,
  quantity = 1,
) => {
  return await prisma.cart.upsert({
    where: {
      authorId_medicineId: {
        authorId,
        medicineId,
      },
    },
    update: {
      quantity: {
        increment: quantity,
      },
    },
    create: {
      authorId,
      medicineId,
      quantity,
    },
  });
};

export const cartServices = {
  createCart,
};
