import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const titikCreateService = async (input: Prisma.TitikCreateInput) => {
  const data = await prisma.titik.create({
    data: input,
  });

  return data;
};

export const titikSelectAllService = async () => {
  const data = await prisma.titik.findMany();

  return data;
};

export const titikCountAllService = async () => {
  const data = prisma.lokasi.count();

  return data;
};

export const titikGetByIdService = async (id: number) => {
  const data = await prisma.titik.findUnique({
    where: {
      id,
    },
    include: {
      Lokasi: true,
    },
  });

  return data;
};

export const titikUpdateService = async (id: number, input: Prisma.TitikUpdateInput) => {
  const data = await prisma.titik.update({
    where: {
      id,
    },
    data: input,
  });

  return data;
};

export const titikGetByIdLokasiService = async (id: number) => {
  const data = await prisma.lokasi.findMany({
    where: {
      id,
    },
    include: {
      titiks: true,
      _count: {
        select: {
          titiks: true,
        },
      },
    },
  });

  return data;
};
