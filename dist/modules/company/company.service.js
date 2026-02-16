import { prisma } from "../../lib/prisma.js";
export const createCompany = async (data) => {
    return await prisma.company.create({
        data,
    });
};
export const companyServices = {
    createCompany,
};
