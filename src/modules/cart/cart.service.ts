import { prisma } from "../../lib/prisma.js";

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

const getAllCart = async (authorId: string) => {
  return await prisma.cart.findMany({
    where: { authorId },
    include: { medicine: true },
  });
};

const singleCartDelete = async (id: string, authorId: string) => {
  return await prisma.cart.delete({ where: { id, authorId } });
};

const deleteAllCart = async (authorId: string) => {
  return await prisma.cart.deleteMany({ where: { authorId } });
};

export const cartServices = {
  createCart,
  getAllCart,
  singleCartDelete,
  deleteAllCart,
};
