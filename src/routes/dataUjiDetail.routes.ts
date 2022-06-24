import { FastifyPluginAsync, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { DataUjiDetailSchema, DataUjiDetailByIdParamSchema } from '../schemas/schema_types/dataUjiDetail.schemas.types';

import { getAllDataUjiDetail, getDataUjiDetailById, updateDataUjiDetail } from '../handlers/dataUjiDetail.controllers';

const routes : FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/api/data-uji/detail',
    handler: getAllDataUjiDetail,
  });

  fastify.route({
    method: 'GET',
    url: '/api/data-uji/detail/:id',
    schema: {
      params: DataUjiDetailByIdParamSchema,
    },
    handler: getDataUjiDetailById,
  });

  fastify.route({
    method: 'PUT',
    url: '/api/data-uji/detail/update/:id',
    schema: {
      body: DataUjiDetailSchema,
      params: DataUjiDetailByIdParamSchema,
    },
    handler: updateDataUjiDetail,
  });
};

export default fp(routes);
