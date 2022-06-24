import { FastifyRequest, FastifyReply } from 'fastify';
import { DataUjiByIdParamTypes, DataUjiSelfTypes, DataUjiTypes } from '../schemas/schema_types/dataUji.schemas.types';

import {
  dataUjiCountAllServices, dataUjiCreateService, dataUjiGetByIdService, dataUjiSelectAllService, dataUjiUpdateService,
} from '../services/dataUji.services';
import { parameterSelectAllService } from '../services/parameter.services';
import { titikGetByIdService } from '../services/titik.services';

export async function createDataUji(request: FastifyRequest<{Body: DataUjiTypes}>, reply: FastifyReply) {
  try {
    const { body } = request;

    const titik = await titikGetByIdService(body.titikId);
    if (!titik) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Titik lokasi not found',
      });
    }

    // get parameter ids from POST
    const paramPostIds = body.dataujidetails.map((v) => v.parameterId);
    // check duplicate paramPostIds
    const duplicatePostIds = paramPostIds.filter((item, index) => paramPostIds.indexOf(item) !== index);
    if (duplicatePostIds.length > 0) {
      return reply.status(400).send({
        statusCode: 400,
        error: 1,
        message: `Parameter with id ${duplicatePostIds} is duplicated`,
      });
    }

    // select all parameter
    const getParamData = await parameterSelectAllService();
    // get parameter ids from getParamData
    const paramDbIds = getParamData.map((v) => v.id);
    // filter parameter from POST and Database
    const checkParamIds = paramPostIds.filter((v) => paramDbIds.indexOf(v) === -1);

    if (checkParamIds.length > 0) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: `Parameter with id ${checkParamIds} not found`,
      });
    }

    const data = {
      titikId: body.titikId,
      nomor_uji: body.nomor_uji,
      tahun: body.tahun,
      bulan: body.bulan,
      dataujidetails: {
        create: body.dataujidetails,
      },
    };

    const create = await dataUjiCreateService(data);

    return reply.status(201).send({
      statusCode: 201,
      error: 0,
      message: 'Data uji created successfully',
      data: create,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getAllDataUji(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = await dataUjiSelectAllService();
    const count = await dataUjiCountAllServices();

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Get all data uji successfully loaded',
      count,
      result: data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getDataUjiById(request: FastifyRequest<{Params: DataUjiByIdParamTypes}>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const data = await dataUjiGetByIdService(id);
    if (!data) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data uji not found',
      });
    }

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: `Success get data uji with id : ${id}`,
      result: data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function updateDataUji(
  request: FastifyRequest<{Params: DataUjiByIdParamTypes, Body: DataUjiSelfTypes}>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const { body } = request;

    const data = await dataUjiGetByIdService(id);
    if (!data) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data uji not found',
      });
    }

    const update = await dataUjiUpdateService(id, body);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Success update data uji',
      result: update,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}
