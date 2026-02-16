import { Medicine } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
type CreateMedicineInput = Omit<Medicine, "createdAt" | "updatedAt">;
const createMedicine = async (data: CreateMedicineInput, sellerId: string) => {
  const company = await prisma.company.findFirst({
    orderBy: { createdAt: "desc" },
  });
  if (!company) {
    throw new Error("Company not found. Please create the company first.");
  }

  return await prisma.medicine.create({
    data: {
      ...data,
      expiryDate: new Date(data.expiryDate),
      sellerId,
      companyId: company.id,
      categoryId: data.categoryId || null,
    },
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
  if ("categoryId" in data) {
    data.categoryId = data.categoryId || null;
  }
  return await prisma.medicine.update({
    where: {
      id,
    },
    data,
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
    },
  });
  if (!isSeller && medicineInfo.sellerId !== sellerId) {
    throw new Error("Your are not owner/create of the medicine");
  }
  return await prisma.medicine.delete({
    where: {
      id: medicineInfo.id,
    },
  });
};

export const medicineServices = {
  createMedicine,
  getMedicine,
  updateMedicine,
  deleteMedicine,
  singleMedicine,
};
