import { Category } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

 const createCategory = async (data: Category) => {
  return await prisma.category.create({
    data,
  });
};

export const categoryServices = {
  createCategory,
};
