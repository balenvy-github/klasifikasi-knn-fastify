import { PrismaClient, Prisma } from '@prisma/client';
import errorTesting from '../utils/knnTesting';
import shuffleArray from '../utils/shuffleArray';

const prisma = new PrismaClient();
const MlKnn = require('ml-knn');

// type HasilUjiSalahTypes = {
//   pm10: number;
//   so2: number;
//   co: number;
//   o3: number;
//   no2: number;
//   kategori: string;
//   knn: string;
// }

// type HasilTrainingTypes = {
//   jumlah_data: number;
//   jumlah_data_train: number;
//   jumlah_data_test: number;
//   jumlah_data_test_benar: number;
//   jumlah_data_test_salah: number;
//   akurasi: string;
//   hasilujisalahs: {
//       create: Array<HasilUjiSalahTypes | null>
//   }
// }

export const knnCreateManyService = async (input: Array<Prisma.KnnKlasifikasiCreateManyInput>) => {
  const data = await prisma.knnKlasifikasi.createMany({
    data: input,
  });

  return data;
};

export const knnSelectAllService = async () => {
  const data = await prisma.knnKlasifikasi.findMany();

  return data;
};

export async function knnCountAllServices() {
  const data = await prisma.knnKlasifikasi.count();

  return data;
}

export async function dataTrainGetByIdServices(id: number) {
  const data = await prisma.knnKlasifikasi.findUnique({
    where: {
      id,
    },
  });

  return data;
}

export const dataTrainUpdateServices = async (id: number, input: Prisma.KnnKlasifikasiUpdateInput) => {
  const data = await prisma.knnKlasifikasi.update({
    where: {
      id,
    },
    data: input,
  });

  return data;
};

export async function dataTrainGetLastIdServices() {
  const data = await prisma.knnKlasifikasi.findFirst({
    orderBy: {
      id: 'desc',
    },
  });

  return data;
}

// export const lokasiGetByIdService = async (id: number) => {
//   const data = await prisma.lokasi.findUnique({
//     where: {
//       id,
//     },
//   });

//   return data;
// };

// export const lokasiUpdateService = async (id: number, input: Prisma.LokasiUpdateInput) => {
//   const data = await prisma.lokasi.update({
//     where: {
//       id,
//     },
//     data: input,
//   });

//   return data;
// };

export const knnTrainingService = async () => {
  const dataTrain = [];
  const labelTrain = [];

  // prepare data
  let jsondata = await knnSelectAllService();

  jsondata = shuffleArray(jsondata);
  const separationSize = 0.8 * jsondata.length;

  // convert object to array *array is the format for the lib
  for (let i = 0; i < jsondata.length; i += 1) {
    const item = jsondata[i];
    dataTrain.push([item.pm10, item.so2, item.co, item.o3, item.no2]);
    labelTrain.push([item.kategori]);
  }

  // separate data training and data testing
  const trainingSetData = dataTrain.slice(0, separationSize);
  const trainingSetLabel = labelTrain.slice(0, separationSize);
  const testSetData = dataTrain.slice(separationSize);
  const testSetLabel = labelTrain.slice(separationSize);

  // train the data
  const knn = new MlKnn(trainingSetData, trainingSetLabel, { k: 5 });

  const data = {
    data: jsondata,
    separationSize,
    trainingSetData,
    trainingSetLabel,
    testSetData,
    testSetLabel,
    knn,
  };

  return data;
};

export const knnTestingService = (knn: any, testSetData: any, testSetLabel: any) => {
  // test the data
  const testResultLabel = knn.predict(testSetData);
  const testSetLength = testSetData.length;
  const predictionError = errorTesting(testResultLabel, testSetLabel);

  const predictionTrue = testSetLength - predictionError;
  const akurasi = predictionTrue / testSetLength;
  const persenAkurasi = Math.round(akurasi * 100);

  const data = {
    testSetLength,
    predictionError,
    predictionTrue,
    persenAkurasi,
    testResultLabel,
  };

  return data;
};

export const knnInsertTrainingService = async (
  input: any,
) => {
  const data = await prisma.hasilTraining.create({
    data: input,
  });

  return data;
};

export const knnGetHasilTrainingService = async () => {
  const data = await prisma.hasilTraining.findFirst({
    orderBy: {
      id: 'desc',
    },
    include: {
      hasilujisalahs: true,
    },
  });

  return data;
};

export const knnGetHasilTrainingByIdService = async (id: number | undefined) => {
  const data = await prisma.hasilTraining.findUnique({
    where: {
      id,
    },
  });

  return data;
};
