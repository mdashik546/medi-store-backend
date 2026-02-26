import { Medicine } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import { ICategoryAndMedicinePayload } from "./medicine.interface.js";

const createMedicine = async (
  {
    categoryName,
    name,
    price,
    stock,
    expiryDate,
    imageURL,
    description,
  }: ICategoryAndMedicinePayload,
  sellerId: string,
) => {
  return await prisma.$transaction(async (tx) => {
    let category = await tx.category.findFirst({
      where: { categoryName },
    });

    if (!category) {
      category = await tx.category.create({
        data: { categoryName },
      });
    }
    const medicine = await tx.medicine.create({
      data: {
        name,
        price,
        stock,
        expiryDate: new Date(expiryDate),
        imageURL,
        description,
        sellerId,
        categoryId: category.id,
      },
    });
    return { category, medicine };
  });
};
const getMedicine = async () => {
  return await prisma.medicine.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
const singleMedicine = async (id: string) => {
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

const updateMedicine = async (
  id: string,
  data: Partial<Medicine>,
  sellerId: string,
  isSeller: boolean,
) => {
  const medicineInfo = await prisma.medicine.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      sellerId: true,
    },
  });
  if (!isSeller && medicineInfo.sellerId !== sellerId) {
    throw new Error("Your are not owner/create of the medicine");
  }
  if (typeof data.stock === "number" && data.stock < 0) {
    throw new Error("Stock cannot be negative");
  }

  return await prisma.medicine.update({
    where: {
      id,
    },
    data:{
      name: data.name,
      price: data.price,
      stock: data.stock,
      description: data.description,
    },
  });
};

const deleteMedicine = async (
  id: string,
  sellerId: string,
  isSeller: boolean,
) => {
  const medicineInfo = await prisma.medicine.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      sellerId: true,
      categoryId: true,
    },
  });
  if (!isSeller && medicineInfo.sellerId !== sellerId) {
    throw new Error("Your are not owner/create of the medicine");
  }

  return await prisma.$transaction(async (tx) => {
    await tx.medicine.delete({
      where: {
        id: medicineInfo.id,
      },
    });
    await tx.category.delete({
      where: {
        id: medicineInfo.categoryId,
      },
    });
  });
};

export const medicineServices = {
  createMedicine,
  getMedicine,
  updateMedicine,
  deleteMedicine,
  singleMedicine,
};
