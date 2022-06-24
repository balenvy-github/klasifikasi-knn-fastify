import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { login } from '../handlers/auth.controllers';
import { LoginAuthSchemas } from '../schemas/auth.schema';
import { AuthLoginTypes } from '../schemas/schema_types/auth.schemas.types';

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.post<{
    Body: AuthLoginTypes,
  }>(
    '/api/auth/login',
    {
      schema: LoginAuthSchemas,
    },
    login,
  );
};

export default fp(routes);
