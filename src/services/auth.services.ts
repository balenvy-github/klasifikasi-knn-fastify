import { FastifyInstance } from 'fastify';

interface PayloadProps {
    id: number,
    nama: string,
    email: string,
    level: string,
}

export function signAccessToken(fastify: FastifyInstance, user: PayloadProps) {
  const token = fastify.jwt.sign({ user }, { expiresIn: '10m' });

  return token;
}

export function signRefreshToken(token: string) {
  return token;
}
