import { FastifyRequest, FastifyReply } from 'fastify';
import { DataUjiDetailByIdParamTypes, DataUjiDetailTypes } from '../schemas/schema_types/dataUjiDetail.schemas.types';
import {
  dataUjiDetailCountAllService,
  dataUjiDetailGetByIdService,
  dataUjiDetailParamDuplicateService,
  dataUjiDetailSelectAllService,
  dataUjiDetailUpdateService,
} from '../services/dataUjiDetail.services';
import { parameterGetById } from '../services/parameter.services';

export async function getAllDataUjiDetail(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = await dataUjiDetailSelectAllService();
    const count = await dataUjiDetailCountAllService();

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Get all data uji detail successfully loaded',
      count,
      result: data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function getDataUjiDetailById(
  request: FastifyRequest<{Params: DataUjiDetailByIdParamTypes}>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    const data = await dataUjiDetailGetByIdService(id);
    if (!data) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data Uji Detail not found',
      });
    }

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: `Success get data uji detail with id : ${id}`,
      result: data,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}

export async function updateDataUjiDetail(
  request: FastifyRequest<{Params: DataUjiDetailByIdParamTypes, Body: DataUjiDetailTypes}>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const { body } = request;

    const data = await dataUjiDetailGetByIdService(id);
    if (!data) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Data Uji Detail not found',
      });
    }

    const checkParamUji = await parameterGetById(body.parameterId);
    if (!checkParamUji) {
      return reply.status(404).send({
        statusCode: 404,
        error: 1,
        message: 'Parameter uji not found',
      });
    }

    // get data uji detail dimana
    // 1. id data uji detail?
    // 2. parameter yang baru gk boleh duplicate sama yang sudah diinput kecuali parameternya nggak diubah
    if (body.parameterId !== data.parameterId) {
      const checkParamDuplicate = await dataUjiDetailParamDuplicateService(data.DataUji.id, body.parameterId);
      if (checkParamDuplicate) {
        return reply.status(400).send({
          statusCode: 400,
          error: 1,
          message: 'Parameter already exist, please use different parameter',
        });
      }
    }

    const update = await dataUjiDetailUpdateService(id, body);

    return reply.status(200).send({
      statusCode: 200,
      error: 0,
      message: 'Success update data uji detail',
      result: update,
    });
  } catch (error) {
    return reply.status(500).send('Internal Server Error');
  }
}
