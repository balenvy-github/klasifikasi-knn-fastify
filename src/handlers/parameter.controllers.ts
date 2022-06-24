import { FastifyRequest, FastifyReply } from 'fastify';
import {
  parameterSelectAllService,
  parameterCreateService,
  countAllParameterServices,
  parameterGetById,
  parameterUpdateService,
} from '../services/parameter.services';

import { ParameterByIdParamTypes, ParameterTypes } from '../schemas/schema_types/parameter.schemas.types';

export async function createParameter(request: FastifyRequest<{Body: ParameterTypes}>, reply: FastifyReply) {
  try {
    const { body } = request;

    const parameter = await parameterCreateService(body);

    return reply.status(201).send({
      statusCode: 201,
      error: 0,
      message: 'Parameter created successfully',
      data: parameter,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getAllParameter(request: FastifyRequest, reply: FastifyReply) {
  try {
    const parameter = await parameterSelectAllService();
    const count = await countAllParameterServices();

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Get all parameter successfully loaded',
      data: {
        count,
        result: parameter,
      },
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getParameterById(
  request: FastifyRequest<{Params: ParameterByIdParamTypes}>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const data = await parameterGetById(id);

    if (!data) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data not found',
      });
    }

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: `Success get parameter with id : ${id}`,
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function updateParameter(
  request: FastifyRequest<{Body: ParameterTypes, Params: ParameterByIdParamTypes}>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const { body } = request;

    const check = await parameterGetById(id);
    if (!check) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data not found',
      });
    }

    const parameter = await parameterUpdateService(id, body);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Parameter updated successfully',
      data: parameter,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}
