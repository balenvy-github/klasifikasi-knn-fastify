import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type DataUjiDetailInterface = {
    hasil_uji: number;
    parameterId: number;
}

type DataUjiInterface = {
    titikId: number;
    nomor_uji: string;
    tahun: number;
    bulan: number;
    dataujidetails: {
        create: Array<DataUjiDetailInterface>
    }
}

export const dataUjiCreateService = async (input: DataUjiInterface) => {
  const data = await prisma.dataUji.create({
    data: input,
    include: {
      dataujidetails: true,
    },
  });

  return data;
};

export const dataUjiSelectAllService = async () => {
  const data = await prisma.dataUji.findMany({
    include: {
      Titik: true,
      dataujidetails: true,
    },
  });

  return data;
};

export function dataUjiCountAllServices() {
  const data = prisma.dataUji.count();

  return data;
}

export const dataUjiGetByIdService = async (id: number) => {
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
      _count: {
        select: { dataujidetails: true },
      },
    },
  });

  return data;
};

export const dataUjiUpdateService = async (id: number, input: Prisma.DataUjiUpdateInput) => {
  const data = await prisma.dataUji.update({
    where: {
      id,
    },
    data: input,
  });

  return data;
};
