import { FastifyRequest, FastifyReply } from 'fastify';
import {
  KnnByIdParamTypes,
  KnnManualTypes,
  KnnTypes,
  KnnTypesArray,
} from '../schemas/schema_types/knn.schemas.types';
import {
  dataUjiDetailGetByIdUjiPengujianService,
} from '../services/dataUjiDetail.services';
import { DataUjiByIdParamTypes } from '../schemas/schema_types/dataUji.schemas.types';
import { dataUjiGetByIdService } from '../services/dataUji.services';
import {
  klasfikasiCreateService,
  klasifikasiGetByIdDataUjiService,
} from '../services/klasifikasi.services';
import {
  dataTrainGetByIdServices,
  dataTrainUpdateServices,
  knnCountAllServices,
  knnCreateManyService,
  knnGetHasilTrainingByIdService,
  knnGetHasilTrainingService,
  knnInsertTrainingService,
  knnSelectAllService,
  knnTestingService,
  knnTrainingService,
} from '../services/knn.services';

export async function createDataTrain(request: FastifyRequest<{Body: KnnTypesArray}>, reply: FastifyReply) {
  try {
    const { body } = request;

    const dataTrain = await knnCreateManyService(body);

    return reply.status(201).send({
      statusCode: 201,
      error: 0,
      message: 'Data train created successfully',
      data: dataTrain,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getDataTrainById(
  request: FastifyRequest<{Params: KnnByIdParamTypes}>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    // fixing bug prisma getting string instead of integer idk why
    const idToString = id.toString();
    const idToInt = parseInt(idToString, 10);

    const data = await dataTrainGetByIdServices(idToInt);

    if (!data) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data not found',
      });
    }

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: `Success get data with id : ${id}`,
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function updateDataTrain(
  request: FastifyRequest<{Body: KnnTypes, Params: KnnByIdParamTypes}>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const { body } = request;

    // fixing bug prisma getting string instead of integer idk why
    const idToString = id.toString();
    const idToInt = parseInt(idToString, 10);

    const check = await dataTrainGetByIdServices(idToInt);
    if (!check) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data not found',
      });
    }

    const update = await dataTrainUpdateServices(idToInt, body);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Data updated',
      data: update,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getAllDataTrain(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = await knnSelectAllService();
    const count = await knnCountAllServices();

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'All data train successfully loaded',
      data: {
        count,
        result: data,
      },
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function trainingDatatrain(request: FastifyRequest, reply: FastifyReply) {
  try {
    const knnTraining = await knnTrainingService();
    const {
      knn,
      testSetData,
      testSetLabel,
      data,
      separationSize,
    } = knnTraining;

    const knnTesting = knnTestingService(knn, testSetData, testSetLabel);
    const {
      testSetLength,
      predictionError,
      predictionTrue,
      persenAkurasi,
      testResultLabel,
    } = knnTesting;

    // error data result
    const testingData = testSetData.map((item, index) => {
      if (testSetLabel[index][0] !== testResultLabel[index][0]) {
        return {
          pm10: item[0],
          so2: item[1],
          co: item[2],
          o3: item[3],
          no2: item[4],
          kategori: testSetLabel[index][0],
          labelKnn: testResultLabel[index][0],
        };
      }
      return null;
    });

    const errorData = testingData.filter((el) => el !== null);

    // update ujidata.json

    // deleted cause nodemon reload way too long and make client crash, now we use db instead

    // const jsonString = fs.readFileSync(path.resolve(__dirname, '../../dummy/ujidata.json'));
    // const ujiData = JSON.parse(jsonString.toString());
    // ujiData.jumlah_data = data.length;
    // ujiData.jumlah_data_train = separationSize;
    // ujiData.jumlah_data_test = testSetLength;
    // ujiData.jumlah_data_test_benar = predictionTrue;
    // ujiData.jumlah_data_test_salah = predictionError;
    // ujiData.akurasi = `${persenAkurasi}%`;

    // fs.writeFileSync(path.resolve(__dirname, '../../dummy/ujidata.json'), JSON.stringify(ujiData));

    // deleted cause nodemon reload way too long and make client crash, now we use db instead

    const dataInsert = {
      jumlah_data: data.length,
      jumlah_data_train: Math.round(separationSize),
      jumlah_data_test: testSetLength,
      jumlah_data_test_benar: predictionTrue,
      jumlah_data_test_salah: predictionError,
      akurasi: `${persenAkurasi}%`,
    };
    await knnInsertTrainingService(dataInsert);
    // ends update ujidata.json

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: `Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError}`,
      jumlah_data: data.length,
      jumlah_data_train: Math.round(separationSize),
      jumlah_data_test: testSetLength,
      jumlah_data_test_benar: predictionTrue,
      jumlah_data_test_salah: predictionError,
      akurasi: `${persenAkurasi}%`,
      errorData,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function classifyDataUji(request: FastifyRequest<{Params: DataUjiByIdParamTypes}>, reply: FastifyReply) {
  try {
    const { id } = request.params;

    // check data uji table
    const dataUji = await dataUjiGetByIdService(id);
    if (!dataUji) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data uji not found',
      });
    }

    // check klasifikasi by id data uji
    const klasifikasiByDataUji = await klasifikasiGetByIdDataUjiService(dataUji.id);
    if (klasifikasiByDataUji) {
      return reply.status(400).send({
        statusCode: 400,
        error: 1,
        message: 'Data uji already classified',
      });
    }

    // check params on data uji detail
    const dataUjiParamsLength = dataUji.dataujidetails.length;
    if (dataUjiParamsLength < 5) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data uji parameter harus mempunyai data yang sama dengan data parameter klasifikasi KNN',
      });
    }

    // dress data
    const dataUjiDetailPengujian = await dataUjiDetailGetByIdUjiPengujianService(id);
    if (dataUjiDetailPengujian.length < 5) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data uji parameter harus mempunyai data yang sama dengan data parameter klasifikasi KNN',
      });
    }

    const dataSet = [];
    let paramPm10 = 0;
    let paramSo2 = 0;
    let paramCo = 0;
    let paramO3 = 0;
    let paramNo2 = 0;
    for (let i = 0; i < dataUjiDetailPengujian.length; i += 1) {
      const itemParam = dataUjiDetailPengujian[i];
      if (itemParam.Parameter.kode_pengujian === 'pm10') {
        paramPm10 += itemParam.hasil_uji;
      }
      if (itemParam.Parameter.kode_pengujian === 'so2') {
        paramSo2 += itemParam.hasil_uji;
      }
      if (itemParam.Parameter.kode_pengujian === 'co') {
        paramCo += itemParam.hasil_uji;
      }
      if (itemParam.Parameter.kode_pengujian === 'o3') {
        paramO3 += itemParam.hasil_uji;
      }
      if (itemParam.Parameter.kode_pengujian === 'no2') {
        paramNo2 += itemParam.hasil_uji;
      }
    }
    dataSet.push([paramPm10, paramSo2, paramCo, paramO3, paramNo2]);

    // KNN CLASSIFICATION
    const knnTraining = await knnTrainingService();
    const {
      knn,
    } = knnTraining;
    const classifyResultLabel = knn.predict(dataSet);

    // insert to db
    const dataKlasifikasi = {
      dataUjiId: id,
      pm10: paramPm10,
      so2: paramSo2,
      co: paramCo,
      o3: paramO3,
      no2: paramNo2,
      kategori: classifyResultLabel[0][0],
    };
    const insertKlasifikasi = await klasfikasiCreateService(dataKlasifikasi);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'KNN Classification Success!',
      data: insertKlasifikasi,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

// classifying data without data uji
export async function knnClassifyManual(request: FastifyRequest<{Body: KnnManualTypes}>, reply: FastifyReply) {
  try {
    const { body } = request;

    const dataSet = [];
    const paramPm10 = body.pm10;
    const paramSo2 = body.so2;
    const paramCo = body.co;
    const paramO3 = body.o3;
    const paramNo2 = body.no2;

    dataSet.push([paramPm10, paramSo2, paramCo, paramO3, paramNo2]);

    // KNN CLASSIFICATION
    const knnTraining = await knnTrainingService();
    const {
      knn,
    } = knnTraining;
    const classifyResultLabel = knn.predict(dataSet);

    const dataKlasifikasi = {
      pm10: paramPm10,
      so2: paramSo2,
      co: paramCo,
      o3: paramO3,
      no2: paramNo2,
      kategori: classifyResultLabel[0][0],
    };

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'KNN Classification Success!',
      data: dataKlasifikasi,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getHasilTraining(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = await knnGetHasilTrainingService();

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Success getting training result!',
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getHasilTrainingBeforeLast(request: FastifyRequest, reply: FastifyReply) {
  try {
    const lastData = await knnGetHasilTrainingService();
    const lastId = lastData?.id;
    const lastIdBefore = lastId! - 1;

    // const { id } = request.params;
    // const idToString = id.toString();
    // const idToInt = parseInt(idToString, 10);
    const data = await knnGetHasilTrainingByIdService(lastIdBefore);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: `Success getting training result by id ${lastIdBefore}!`,
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}
