import fp from 'fastify-plugin';
import {
  FastifyInstance, FastifyRequest, FastifyReply,
} from 'fastify';

// const authMiddleware: FastifyPluginAsync = async (fastify: FastifyInstance) => {
//   fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//       await request.jwtVerify();
//     } catch (error) {
//       reply.status(500).send('Internal Server Error');
//     }
//   });
// };

export default fp(async (fastify: FastifyInstance) => {
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify((err) => {
        if (err) reply.send(err);
      });
    } catch (error) {
      reply.status(500).send('Internal Server Error');
    }
  });
});
