import { prisma } from "../../lib/prisma";

const createCart = async (
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
const getAllCart = async () => {
  return await prisma.cart.findMany();
};
export const cartServices = {
  createCart,
  getAllCart,
};
