import { PrismaClient, Prisma } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

const AccountSelect = Prisma.validator<Prisma.AccountSelect>()({
  id: true,
  nama: true,
  email: true,
  level: true,
  createdAt: true,
  updatedAt: true,
});

export async function createAccountServices(input: Prisma.AccountCreateInput) {
  const hashedPassword = await argon2.hash(input.password);
  return prisma.account.create({
    data: {
      nama: input.nama,
      email: input.email,
      password: hashedPassword,
      level: input.level,
    },
  });
}

export async function updateAccountServices(id: number, input: Prisma.AccountCreateInput) {
  const hashedPassword = await argon2.hash(input.password);
  const data = prisma.account.update({
    data: {
      nama: input.nama,
      email: input.email,
      password: hashedPassword,
      level: input.level,
    },
    where: {
      id,
    },
  });

  return data;
}

export function findUserByEmail(email: string) {
  const checkEmail = prisma.account.findUnique({
    where: {
      email,
    },
  });

  return checkEmail;
}

export function getAllAccountServices() {
  const data = prisma.account.findMany({
    select: AccountSelect,
  });

  return data;
}

export function countAllAccountServices() {
  const data = prisma.account.count();

  return data;
}

export function getAccountByIdServices(id: number) {
  const data = prisma.account.findUnique({
    where: {
      id,
    },
    select: AccountSelect,
  });

  return data;
}
