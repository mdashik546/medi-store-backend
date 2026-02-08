import type { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
const createOrder = async (data: Order, userId: string) => {};
const getAllOrder = async () => {
  return await prisma.medicine.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
const singleOrder = async (id: string) => {
  const medicineInfo = await prisma.medicine.findUnique({
    where: {
      id,
    },
  });
  if (!medicineInfo) {
    throw new Error("MedicineId is Invalid!!");
  }

  return medicineInfo;
};

export const orderServices = {
  createOrder,
  getAllOrder,
  singleOrder,
};
