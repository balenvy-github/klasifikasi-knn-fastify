import { Static, Type } from '@sinclair/typebox';

export const DataUjiSchema = Type.Object(
  {
    titikId: Type.Integer(),
    nomor_uji: Type.String(),
    tahun: Type.Integer(),
    bulan: Type.Integer(),
    dataujidetails: Type.Array(
      Type.Object({
        parameterId: Type.Integer(),
        hasil_uji: Type.Integer(),
      }),
    ),
  },
);

export const DataUjiSelfSchema = Type.Object(
  {
    titikId: Type.Optional(
      Type.Integer(),
    ),
    nomor_uji: Type.String(),
    tahun: Type.Integer(),
    bulan: Type.Integer(),
  },
);

export const DataUjiByIdParamSchema = Type.Object(
  {
    id: Type.Number(),
  },
);

export type DataUjiByIdParamTypes = Static<typeof DataUjiByIdParamSchema>;
export type DataUjiTypes = Static<typeof DataUjiSchema>;
export type DataUjiSelfTypes = Static<typeof DataUjiSelfSchema>;
