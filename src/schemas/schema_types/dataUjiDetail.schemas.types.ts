import { Static, Type } from '@sinclair/typebox';

export const DataUjiDetailSchema = Type.Object(
  {
    parameterId: Type.Integer(),
    hasil_uji: Type.Integer(),
  },
);

export const DataUjiDetailByIdParamSchema = Type.Object(
  {
    id: Type.Number(),
  },
);

export type DataUjiDetailTypes = Static<typeof DataUjiDetailSchema>;
export type DataUjiDetailByIdParamTypes = Static<typeof DataUjiDetailByIdParamSchema>;
