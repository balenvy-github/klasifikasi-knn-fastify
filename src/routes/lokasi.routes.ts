import { FastifyPluginAsync, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import {
  createLokasi, getAllLokasi, getLokasiById, updateLokasi,
} from '../handlers/lokasi.controllers';
import { LokasiByIdParamSchema, LokasiSchema } from '../schemas/schema_types/lokasi.schemas.types';

const routes : FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/api/lokasi/create',
    schema: {
      body: LokasiSchema,
    },
    handler: createLokasi,
  });

  fastify.route({
    method: 'GET',
    url: '/api/lokasi',
    handler: getAllLokasi,
  });

  fastify.route({
    method: 'GET',
    url: '/api/lokasi/:id',
    schema: {
      params: LokasiByIdParamSchema,
    },
    handler: getLokasiById,
  });

  fastify.route({
    method: 'PUT',
    url: '/api/lokasi/update/:id',
    schema: {
      body: LokasiSchema,
      params: LokasiByIdParamSchema,
    },
    handler: updateLokasi,
  });
};

export default fp(routes);
