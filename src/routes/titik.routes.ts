import { FastifyPluginAsync, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import {
  createTitik,
  getAllTitik,
  getTitikById,
  getTitikByIdLokasi,
  updateTitik,
} from '../handlers/titik.controllers';
import { TitikByIdParamSchema, TitikSchema } from '../schemas/schema_types/titik.schemas.types';

const routes : FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/api/titik/create',
    schema: {
      body: TitikSchema,
    },
    handler: createTitik,
  });

  fastify.route({
    method: 'GET',
    url: '/api/titik',
    handler: getAllTitik,
  });

  fastify.route({
    method: 'GET',
    url: '/api/titik/:id',
    schema: {
      params: TitikByIdParamSchema,
    },
    handler: getTitikById,
  });

  fastify.route({
    method: 'GET',
    url: '/api/lokasi/:id/titik',
    schema: {
      params: TitikByIdParamSchema,
    },
    handler: getTitikByIdLokasi,
  });

  fastify.route({
    method: 'PUT',
    url: '/api/titik/update/:id',
    schema: {
      body: TitikSchema,
      params: TitikByIdParamSchema,
    },
    handler: updateTitik,
  });
};

export default fp(routes);
