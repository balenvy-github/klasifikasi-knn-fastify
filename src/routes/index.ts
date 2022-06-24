import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

// const routes: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/', {}, async (request, reply) => {
    reply.code(200).send('hi');
  });
};

export default fp(routes);
