import { prisma } from "../../lib/prisma.js";

const getAllUser = async () => {
  return await prisma.user.findMany();
};

const getAllOrder = async () => {
  return await prisma.order.findMany({
    include: {
      author: true,
    },
  });
};

const update = async (userId: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      id: true,
      status: true,
    },
  });
  const newStatus = userData.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  return prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      status: newStatus,
    },
  });
};
const getAllCategory = async () => {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      medicines: true,
    },
  });
};

export const adminServices = {
  getAllUser,
  update,
  getAllOrder,
  getAllCategory,
};
