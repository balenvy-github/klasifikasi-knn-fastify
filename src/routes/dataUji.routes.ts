import { FastifyPluginAsync, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import {
  createDataUji, getAllDataUji, getDataUjiById, updateDataUji,
} from '../handlers/dataUji.controllers';
import {
  DataUjiByIdParamSchema,
  DataUjiSchema,
  DataUjiSelfSchema,
} from '../schemas/schema_types/dataUji.schemas.types';

const routes : FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/api/data-uji/create',
    schema: {
      body: DataUjiSchema,
    },
    handler: createDataUji,
  });

  fastify.route({
    method: 'GET',
    url: '/api/data-uji',
    handler: getAllDataUji,
  });

  fastify.route({
    method: 'GET',
    url: '/api/data-uji/:id',
    schema: {
      params: DataUjiByIdParamSchema,
    },
    handler: getDataUjiById,
  });

  fastify.route({
    method: 'PUT',
    url: '/api/data-uji/update/:id',
    schema: {
      body: DataUjiSelfSchema,
      params: DataUjiByIdParamSchema,
    },
    handler: updateDataUji,
  });
};

export default fp(routes);
