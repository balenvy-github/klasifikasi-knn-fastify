import { FastifyRequest, FastifyReply } from 'fastify';
import { LokasiByIdParamTypes, LokasiTypes } from '../schemas/schema_types/lokasi.schemas.types';
import {
  lokasiCountAllServices, lokasiCreateService, lokasiGetByIdService, lokasiSelectAllService, lokasiUpdateService,
} from '../services/lokasi.services';

export async function createLokasi(request: FastifyRequest<{Body: LokasiTypes}>, reply: FastifyReply) {
  try {
    const { body } = request;

    const data = await lokasiCreateService(body);

    return reply.status(201).send({
      statusCode: 201,
      error: 0,
      message: 'Lokasi created successfully',
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getAllLokasi(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = await lokasiSelectAllService();
    const count = await lokasiCountAllServices();

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Get all lokasi successfully loaded',
      data: {
        count,
        result: data,
      },
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getLokasiById(request: FastifyRequest<{Params: LokasiByIdParamTypes}>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const data = await lokasiGetByIdService(id);

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
      message: `Success get lokasi with id : ${id}`,
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function updateLokasi(
  request: FastifyRequest<{Params: LokasiByIdParamTypes, Body: LokasiTypes}>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const { body } = request;

    const check = await lokasiGetByIdService(id);
    if (!check) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data not found',
      });
    }

    const data = await lokasiUpdateService(id, body);

    return reply.status(201).send({
      statusCode: 201,
      error: 0,
      message: 'Lokasi updated successfully',
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}
