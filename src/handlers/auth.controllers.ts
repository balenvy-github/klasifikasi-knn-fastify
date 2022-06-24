import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import * as argon2 from 'argon2';
import { AuthLoginTypes } from '../schemas/schema_types/auth.schemas.types';
import { findUserByEmail } from '../services/account.services';
import { signAccessToken } from '../services/auth.services';

export async function login(
  this: FastifyInstance,
  request: FastifyRequest<{Body: AuthLoginTypes}>,
  reply: FastifyReply,
) {
  try {
    const { email, password } = request.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: `Cannot find an account with email : ${email}`,
      });
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return reply.status(404).send({
        statusCode: 400,
        error: 1,
        message: 'Invalid email or password',
      });
    }

    const payload = {
      id: user.id,
      nama: user.nama,
      email: user.email,
      level: user.level,
    };

    const accessToken = signAccessToken(this, payload);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Login success',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}
export async function refreshAccessToken() {
  return null;
}
