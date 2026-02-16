import { prisma } from "../../lib/prisma.js";
const getAllOrder = async () => {
    return await prisma.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: { author: true },
    });
};
const updateOrderStatus = async (id, status) => {
    const order = await prisma.order.findUniqueOrThrow({
        where: { id },
        select: { orderStatus: true },
    });
    if (order.orderStatus === status) {
        throw new Error(`Order is already in status '${status}'. No update needed.`);
    }
    return await prisma.order.update({
        where: { id },
        data: { orderStatus: status },
    });
};
export const sellerServices = {
    getAllOrder,
    updateOrderStatus,
};
