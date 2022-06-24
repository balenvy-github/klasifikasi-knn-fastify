import { Static, Type } from '@sinclair/typebox';

const LokasiSchema = Type.Object(
  {
    nama_lokasi: Type.String(),
  },
);

const LokasiByIdParamSchema = Type.Object(
  {
    id: Type.Number(),
  },
);

export type LokasiByIdParamTypes = Static<typeof LokasiByIdParamSchema>;
export type LokasiTypes = Static<typeof LokasiSchema>

export {
  LokasiByIdParamSchema,
  LokasiSchema,
};
