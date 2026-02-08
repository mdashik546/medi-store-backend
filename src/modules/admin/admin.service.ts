import { prisma } from "../../lib/prisma";

export const getAllUser = async () => {
  return await prisma.user.findMany();
};
export const update = async (userId: string) => {
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

export const adminServices = {
  getAllUser,
  update,
};
