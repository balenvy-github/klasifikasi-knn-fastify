import { FastifyPluginAsync, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { DataUjiByIdParamSchema } from '../schemas/schema_types/dataUji.schemas.types';
import {
  classifyDataUji,
  createDataTrain,
  getAllDataTrain,
  getDataTrainById,
  getHasilTraining,
  getHasilTrainingBeforeLast,
  knnClassifyManual,
  trainingDatatrain,
  updateDataTrain,
} from '../handlers/knn.controllers';

import { KnnManualSchema, KnnSchema, KnnSchemaArray } from '../schemas/schema_types/knn.schemas.types';

const routes : FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/api/knn/train/create',
    schema: {
      body: KnnSchemaArray,
    },
    handler: createDataTrain,
  });

  fastify.route({
    method: 'PUT',
    url: '/api/knn/train/update/:id',
    schema: {
      body: KnnSchema,
    },
    handler: updateDataTrain,
  });

  fastify.route({
    method: 'GET',
    url: '/api/knn/train/:id',
    handler: getDataTrainById,
  });

  fastify.route({
    method: 'GET',
    url: '/api/knn/train',
    handler: getAllDataTrain,
  });

  fastify.route({
    method: 'GET',
    url: '/api/knn/train/training',
    handler: trainingDatatrain,
  });

  fastify.route({
    method: 'POST',
    url: '/api/knn/classify/:id',
    schema: {
      params: DataUjiByIdParamSchema,
    },
    handler: classifyDataUji,
  });

  // klasifikasi whitout data uji
  fastify.route({
    method: 'POST',
    url: '/api/knn/classify',
    schema: {
      body: KnnManualSchema,
    },
    handler: knnClassifyManual,
  });

  // get training result
  fastify.route({
    method: 'GET',
    url: '/api/knn/train/ujidata',
    handler: getHasilTraining,
  });

  // get training result by id
  fastify.route({
    method: 'GET',
    url: '/api/knn/train/ujidata/lastbefore',
    handler: getHasilTrainingBeforeLast,
  });

  //   fastify.route({
  //     method: 'GET',
  //     url: '/api/lokasi/:id',
  //     schema: {
  //       params: LokasiByIdParamSchema,
  //     },
  //     handler: getLokasiById,
  //   });

  //   fastify.route({
  //     method: 'PUT',
  //     url: '/api/lokasi/update/:id',
  //     schema: {
  //       body: LokasiSchema,
  //       params: LokasiByIdParamSchema,
  //     },
  //     handler: updateLokasi,
  //   });

  // fastify.route({
  //   method: 'GET',
  //   url: '/api/knn/train/ujidata',
  // handler: (request: any, reply: any) => {
  //   try {
  //     const jsonString = fs.readFileSync(path.resolve(__dirname, '../../dummy/ujidata.json'));
  //     const data = JSON.parse(jsonString.toString());
  //     return reply.status(200).send(data);
  //   } catch (error) {
  //     return reply.status(500).send('Internal Server Error');
  //   }
  // },
  // });
};

export default fp(routes);
