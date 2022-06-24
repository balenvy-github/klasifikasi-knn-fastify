import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const dataUjiDetailSelectAllService = async () => {
  const data = await prisma.dataUjiDetail.findMany();

  return data;
};

export const dataUjiDetailCountAllService = async () => {
  const data = prisma.dataUjiDetail.count();

  return data;
};

export const dataUjiDetailGetByIdService = async (id: number) => {
  const data = await prisma.dataUjiDetail.findUnique({
    where: {
      id,
    },
    include: {
      DataUji: true,
      Parameter: true,
    },
  });

  return data;
};

export const dataUjiDetailUpdateService = async (id: number, input: Prisma.DataUjiDetailUpdateInput) => {
  const data = await prisma.dataUjiDetail.update({
    where: {
      id,
    },
    data: input,
  });

  return data;
};

export const dataUjiDetailParamDuplicateService = async (idDataUji: number, idParamUji: number) => {
  const data = await prisma.dataUjiDetail.findFirst({
    where: {
      AND: [
        {
          dataUjiId: idDataUji,
          parameterId: idParamUji,
        },
      ],
    },
  });

  return data;
};

export const dataUjiDetailGetByIdUjiPengujianService = async (id: number) => {
  const data = await prisma.dataUjiDetail.findMany({
    where: {
      AND: [
        {
          dataUjiId: id,
          Parameter: {
            pengujian: true,
          },
        },
      ],
    },
    include: {
      DataUji: true,
      Parameter: true,
    },
  });

  return data;
};
