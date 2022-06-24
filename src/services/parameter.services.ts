import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const parameterCreateService = async (input: Prisma.ParameterCreateInput) => {
  const data = await prisma.parameter.create({
    data: input,
  });

  return data;
};

export const parameterSelectAllService = async () => {
  const data = await prisma.parameter.findMany();

  return data;
};

export function countAllParameterServices() {
  const data = prisma.parameter.count();

  return data;
}

export const parameterGetById = async (id: number) => {
  const data = await prisma.parameter.findUnique({
    where: {
      id,
    },
  });

  return data;
};

export const parameterUpdateService = async (id: number, input: Prisma.ParameterUpdateInput) => {
  const data = await prisma.parameter.update({
    where: {
      id,
    },
    data: input,
  });

  return data;
};
