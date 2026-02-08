import type { Cart } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const createCart = async (data: Cart, authorId: string) => {
  return await prisma;
};

export const cartServices = {
  createCart,
};
