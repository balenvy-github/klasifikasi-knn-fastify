import { FastifyReply, FastifyRequest } from 'fastify';
import { AccountByIdParamTypes, AccountTypes } from '../schemas/schema_types/account.schemas.types';

import {
  createAccountServices,
  findUserByEmail,
  getAllAccountServices,
  countAllAccountServices,
  getAccountByIdServices,
  updateAccountServices,
} from '../services/account.services';

export async function createAccount(request: FastifyRequest<{Body: AccountTypes}>, reply: FastifyReply) {
  try {
    const {
      body,
    } = request;

    const checkEmail = await findUserByEmail(body.email);
    if (checkEmail) {
      return reply.status(400).send({
        statusCode: 400,
        error: 1,
        message: 'Email already registered',
      });
    }

    const account = await createAccountServices(body);

    return reply.status(201).send({
      statusCode: 201,
      error: 0,
      message: 'Account created successfully',
      data: account,
    });
  } catch (e) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getAllAccount(request: FastifyRequest, reply: FastifyReply) {
  try {
    const account = await getAllAccountServices();
    const count = await countAllAccountServices();

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Get all account successfully loaded',
      data: {
        count,
        result: account,
      },
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getAccountById(request: FastifyRequest<{Params: AccountByIdParamTypes}>, reply: FastifyReply) {
  try {
    const { id } = request.params;

    const data = await getAccountByIdServices(id);

    if (!data) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Account not found',
      });
    }

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: `Success get account with id : ${id}`,
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function updateAccount(
  request: FastifyRequest<{Params: AccountByIdParamTypes, Body: AccountTypes}>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    const {
      body,
    } = request;

    const account = await findUserByEmail(body.email);
    if (!account) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: `Cannot find an account with email : ${body.email}`,
      });
    }

    const newAccount = await updateAccountServices(id, body);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Account updated successfully',
      data: newAccount,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}
