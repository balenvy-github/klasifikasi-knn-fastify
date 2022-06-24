import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const klasifikasiGetByIdDataUjiService = async (id: number) => {
  const data = await prisma.klasifikasi.findFirst({
    where: {
      dataUjiId: id,
    },
  });

  return data;
};

// dah ada di datauji
export const klasfikasiDataUjiByIdDataUji = async (id: number) => {
  const data = await prisma.dataUji.findUnique({
    where: {
      id,
    },
    include: {
      Titik: true,
      dataujidetails: {
        include: {
          Parameter: true,
        },
      },
    },
  });

  return data;
};

export const klasfikasiCreateService = async (input: Prisma.KlasifikasiCreateInput) => {
  const data = await prisma.klasifikasi.create({
    data: input,
  });

  return data;
};
