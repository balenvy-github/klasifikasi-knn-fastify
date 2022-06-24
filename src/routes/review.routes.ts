import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
// import { TwitterApi } from 'twitter-api-v2';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

import reviewHandler from '../handlers/review.controllers';
import { ReviewHandlerSchema } from '../schemas/review.schemas';
import { knnSelectAllService } from '../services/knn.services';
import errorTesting from '../utils/knnTesting';
import shuffleArray from '../utils/shuffleArray';

const MlKnn = require('ml-knn');

const prisma = new PrismaClient();

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/blogs', {}, async (request, reply) => {
    const blogs = await prisma.blog.findMany();
    reply.code(200).send(blogs);
  });

  fastify.post(
    '/review',
    {
      schema: ReviewHandlerSchema,
    },
    reviewHandler,
  );

  fastify.get('/fp', async () => {
    // const client = new TwitterApi(process.env.TWITTER_BEARER!);

    // const result = await client.v2.search(
    //   'izone',
    //   {
    //     max_results: 10,
    //   },
    // );
    // return { result };
  });

  fastify.get('/aqi', async (request, reply) => {
    // comment
    // const jsonPath = path.join(__dirname, '../../dummy/', 'aqi.json');
    // const data = fs.readFileSync(jsonPath);
    // const jsondata = JSON.parse(data.toString());

    // const dataTrain = jsondata.map((item: any) => ({
    //   pm10: item.pm10,
    //   so2: item.so2,
    //   co: item.co,
    //   o3: item.o3,
    //   no2: item.no2,
    // }));
    // ends comment

    const dataTrain = [];
    const labelTrain = [];

    let jsondata = await knnSelectAllService();
    jsondata = shuffleArray(jsondata);
    const separationSize = 0.7 * jsondata.length;
    console.log('separationSize: ', separationSize);

    for (let i = 0; i < jsondata.length; i += 1) {
      const item = jsondata[i];
      dataTrain.push([item.pm10, item.so2, item.co, item.o3, item.no2]);
      labelTrain.push([item.kategori]);
    }

    const trainingSetData = dataTrain.slice(0, separationSize);
    const trainingSetLabel = labelTrain.slice(0, separationSize);
    const testSetData = dataTrain.slice(separationSize);
    const testSetLabel = labelTrain.slice(separationSize);

    console.log('========== train data ============');
    console.log('training data: ', trainingSetData);
    console.log('training label: ', trainingSetLabel);
    console.log('========== test data ============');
    console.log('test data: ', testSetData);
    console.log('test label: ', testSetLabel);
    console.log('========== end data ============');

    // comment
    // const dataTrain = [];
    // const labelTrain = [];
    // for (let i = 0; i < jsondata.length; i += 1) {
    //   const el = jsondata[i];
    //   dataTrain.push([el.pm10, el.so2, el.co, el.o3, el.no2]);
    //   labelTrain.push([el.kategori]);
    // }
    // ends comment

    const knn = new MlKnn(trainingSetData, trainingSetLabel, { k: 5 });

    // comment
    // const testDataset = [
    //   [24, 17, 52, 95, 3],
    //   [32, 21, 39, 43, 4],
    //   [34, 20, 46, 63, 4],
    // ];
    // const testLabel = [
    //   ['SEDANG'],
    //   ['SEDANG'],
    //   ['BAIK'],
    // ];
    // ends comment

    const testDataset = testSetData;
    const testLabel = testSetLabel;

    // testing
    const result = knn.predict(testDataset);
    const testSetLength = testDataset.length;
    const predictionError = errorTesting(result, testLabel);

    const predictionTrue = testSetLength - predictionError;
    const akurasi = predictionTrue / testSetLength;
    const persenAkurasi = Math.round(akurasi * 100);
    // end testing

    // const ans = knn.predict(testDataset);
    // const save = knn.toJSON();

    reply.send({
      message: `Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError}`,
      jumlah_data: jsondata.length,
      jumlah_data_train: separationSize,
      jumlah_data_test: testSetLength,
      jumlah_data_test_benar: predictionTrue,
      jumlah_data_test_salah: predictionError,
      akurasi: `${persenAkurasi}%`,
      klasifikasi: result,
      harusnya: testLabel,
    });
  });

  fastify.get('/knn', async (request, reply) => {
    try {
      const dataset = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
        [2, 2, 2],
        [1, 2, 2],
        [2, 1, 2],
      ];
      const predictions = ['nol', 'nol', 'nol', 'satu', 'satu', 'satu'];
      const knn = new MlKnn(dataset, predictions);

      const newdataset = [[2, 2, 2], [1, 1, 0]];

      const ans = knn.predict(newdataset);
      return reply.send(ans);
    } catch (error) {
      return reply.send('error');
    }
  });
};

export default fp(routes);

// ==============================fp grwothc
// const transactions: string[][] = [
//   ['kopi', 'gula', 'rinso'],
//   ['krimer', 'gula', 'air'],
//   ['kopi', 'krimer', 'gula', 'air'],
//   ['krimer', 'air'],
//   ['kopi', 'krimer', 'gula', 'air'],
// ];

// const fpgrowth: FPGrowth<string> = new FPGrowth<string>(0.4);
// console.log('Executing FPGrowth...');

// fpgrowth.on('data', (itemset: Itemset<string>) => {
//   const { support } = itemset;
//   const { items } = itemset;
//   console.log(`Itemset { ${items.join(',')} } is frequent and have a support of ${support}`);
// });

// fpgrowth.exec(transactions)
//   .then((itemsets: Itemset<string>[]) => {
//     console.log(`Finished executing FPGrowth. ${itemsets.length} frequent itemset(s) were found.`);
//   });

// ==============================twitter api v2

// const client = new TwitterApi(process.env.TWITTER_BEARER!);

// const result = await client.v2.get('tweets/search/recent', {
//   query: 'izone',
//   max_results: 20,
// });
// console.log(result.data);

// return { result };

// compare 2 array of testing data
// let misclassifications = 0;
// for (let index = 0; index < result.length; index += 1) {
//   const innerArrayLength = result[index].length;
//   for (let j = 0; j < innerArrayLength; j += 1) {
//     console.log(result[index][j]);
//     if (result[index][j] !== testLabel[index][j]) {
//       misclassifications += 1;
//     }
//   }
// }
