import { Static, Type } from '@sinclair/typebox';

const ParameterSchema = Type.Object(
  {
    parameter: Type.String(),
    baku_mutu: Type.String(),
    satuan: Type.String(),
    pengujian: Type.Optional(
      Type.Boolean(),
    ),
  },
);

const ParameterByIdParamSchema = Type.Object(
  {
    id: Type.Number(),
  },
);

export type ParameterByIdParamTypes = Static<typeof ParameterByIdParamSchema>;
export type ParameterTypes = Static<typeof ParameterSchema>

export {
  ParameterByIdParamSchema,
  ParameterSchema,
};
