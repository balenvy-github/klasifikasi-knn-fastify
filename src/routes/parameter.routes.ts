import { FastifyPluginAsync, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import {
  createParameter, getAllParameter, getParameterById, updateParameter,
} from '../handlers/parameter.controllers';
import { ParameterByIdParamSchema, ParameterSchema } from '../schemas/schema_types/parameter.schemas.types';

const routes : FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/api/parameter/create',
    schema: {
      body: ParameterSchema,
    },
    handler: createParameter,
  });

  fastify.route({
    method: 'GET',
    url: '/api/parameter',
    handler: getAllParameter,
  });

  fastify.route({
    method: 'GET',
    url: '/api/parameter/:id',
    schema: {
      params: ParameterByIdParamSchema,
    },
    handler: getParameterById,
  });

  fastify.route({
    method: 'PUT',
    url: '/api/parameter/update/:id',
    schema: {
      body: ParameterSchema,
      params: ParameterByIdParamSchema,
    },
    handler: updateParameter,
  });
};

export default fp(routes);
