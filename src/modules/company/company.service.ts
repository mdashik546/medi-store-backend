import { Company } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

export const createCompany = async (data: Company) => {
  return await prisma.company.create({
    data,
  });
};

export const companyServices = {
  createCompany,
};
