import { FastifyRequest, FastifyReply } from 'fastify';
import { TitikByIdParamTypes, TitikTypes } from '../schemas/schema_types/titik.schemas.types';
import { lokasiCountAllServices, lokasiGetByIdService, lokasiSelectAllService } from '../services/lokasi.services';
import {
  titikCreateService, titikGetByIdLokasiService, titikGetByIdService, titikUpdateService,
} from '../services/titik.services';

export async function createTitik(request: FastifyRequest<{Body: TitikTypes}>, reply: FastifyReply) {
  try {
    const { body } = request;

    const lokasi = await lokasiGetByIdService(body.lokasiId);

    if (!lokasi) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Lokasi not found',
      });
    }

    const data = await titikCreateService(body);

    return reply.status(201).send({
      statusCode: 201,
      error: 0,
      message: 'Titik lokasi created successfully',
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getAllTitik(request: FastifyRequest<{Body: TitikTypes}>, reply: FastifyReply) {
  try {
    const data = await lokasiSelectAllService();
    const count = await lokasiCountAllServices();

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Get all titik lokasi successfully loaded',
      data: {
        count,
        result: data,
      },
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getTitikById(request: FastifyRequest<{Params: TitikByIdParamTypes}>, reply: FastifyReply) {
  try {
    const { id } = request.params;

    const data = await titikGetByIdService(id);
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
      message: `Success get data titik lokasi with id : ${id}`,
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getTitikByIdLokasi(request: FastifyRequest<{Params: TitikByIdParamTypes}>, reply: FastifyReply) {
  try {
    const { id } = request.params;

    const lokasi = await lokasiGetByIdService(id);
    if (!lokasi) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Lokasi not found',
      });
    }

    const data = await titikGetByIdLokasiService(id);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: `Success get data titik lokasi with id lokasi : ${id}`,
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function updateTitik(
  request: FastifyRequest<{Body: TitikTypes, Params: TitikByIdParamTypes}>,
  reply: FastifyReply,
) {
  try {
    const { body } = request;
    const { id } = request.params;

    const check = await titikGetByIdService(id);
    if (!check) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data not found',
      });
    }

    const lokasi = await lokasiGetByIdService(body.lokasiId);
    if (!lokasi) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Lokasi not found',
      });
    }

    const data = await titikUpdateService(id, body);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Titik lokasi updated successfully',
      data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}
