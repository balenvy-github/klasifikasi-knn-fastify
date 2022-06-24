import { Static, Type } from '@sinclair/typebox';

export const TitikSchema = Type.Object(
  {
    nama_titik: Type.String(),
    koordinat: Type.String(),
    lokasiId: Type.Integer(),
  },
);

export const TitikByIdParamSchema = Type.Object(
  {
    id: Type.Number(),
  },
);

export type TitikByIdParamTypes = Static<typeof TitikByIdParamSchema>;
export type TitikTypes = Static<typeof TitikSchema>
