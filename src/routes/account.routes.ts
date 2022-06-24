import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import {
  GetAccountByIdSchemas,
  PostAccountSchemas,
  UpdateAccountSchemas,
} from '../schemas/account.schemas';
import {
  createAccount,
  getAccountById,
  getAllAccount,
  updateAccount,
} from '../handlers/account.controllers';
import {
  AccountByIdParamTypes,
  AccountTypes,
} from '../schemas/schema_types/account.schemas.types';

// declare module 'fastify' {
//   interface FastifyInstance {
//     authenticate(): void;
//   }
// }

// const routes: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.post<{
    Body: AccountTypes,
  }>(
    '/account/create',
    {
      schema: PostAccountSchemas,
    },
    createAccount,
  );

  fastify.get('/accounts', getAllAccount);

  fastify.get<{
    Params: AccountByIdParamTypes
  }>(
    '/account/:id',
    {
      schema: GetAccountByIdSchemas,
      preHandler: [fastify.authenticate],
    },
    getAccountById,
  );

  fastify.put<{
    Params: AccountByIdParamTypes,
    Body: AccountTypes
  }>(
    '/account/:id',
    {
      schema: UpdateAccountSchemas,
    },
    updateAccount,
  );
};

export default fp(routes);
