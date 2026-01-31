import type { Company } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const createCompany = async (data: Company) => {
  return await prisma.company.create({
    data,
  });
};

export const companyServices = {
  createCompany,
};
