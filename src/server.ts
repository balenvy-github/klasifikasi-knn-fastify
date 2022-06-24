import { fastify } from 'fastify';
import fastifyJwt from 'fastify-jwt';
import fastifyCors from '@fastify/cors';
import routes from './routes';
import accountRoutes from './routes/account.routes';
import authRoutes from './routes/auth.routes';
import reviewRoutes from './routes/review.routes';
import authMiddleware from './middlewares/auth.middleware';
import parameterRoutes from './routes/parameter.routes';
import lokasiRoutes from './routes/lokasi.routes';
import titikRoutes from './routes/titik.routes';
import dataUjiRoutes from './routes/dataUji.routes';
import dataUjiDetailRoutes from './routes/dataUjiDetail.routes';
import knnRoutes from './routes/knn.routes';

const PORT = process.env.port || 7000;

const server = fastify({
  ajv: {
    customOptions: {
      jsonPointers: true,
      allErrors: true,
    },
  },
  logger: {
    prettyPrint: true,
  },
  disableRequestLogging: true,
});

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate(): void;
  }
}

server.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    const errorData = {
      statusCode: 400,
      error: 1,
      message: 'Validation Error',
      data: error.validation,
    };
    reply.status(400).send(errorData);
  }

  reply.send(error);
});

server.register(fastifyCors);
server.register(fastifyJwt, {
  secret: 'SUPASECRET',
});
server.register(authMiddleware);
server.register(routes);
server.register(accountRoutes);
server.register(authRoutes);
server.register(reviewRoutes);
server.register(parameterRoutes);
server.register(lokasiRoutes);
server.register(titikRoutes);
server.register(dataUjiRoutes);
server.register(dataUjiDetailRoutes);
server.register(knnRoutes);

const start = async () => {
  try {
    await server.listen(PORT);
    server.log.info(`Server running on port ${PORT}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
