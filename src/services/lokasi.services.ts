import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const lokasiCreateService = async (input: Prisma.LokasiCreateInput) => {
  const data = await prisma.lokasi.create({
    data: input,
  });

  return data;
};

export const lokasiSelectAllService = async () => {
  const data = await prisma.lokasi.findMany();

  return data;
};

export function lokasiCountAllServices() {
  const data = prisma.lokasi.count();

  return data;
}

export const lokasiGetByIdService = async (id: number) => {
  const data = await prisma.lokasi.findUnique({
    where: {
      id,
    },
  });

  return data;
};

export const lokasiUpdateService = async (id: number, input: Prisma.LokasiUpdateInput) => {
  const data = await prisma.lokasi.update({
    where: {
      id,
    },
    data: input,
  });

  return data;
};
