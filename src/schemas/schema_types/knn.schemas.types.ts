import { Static, Type } from '@sinclair/typebox';

export const KnnSchema = Type.Object(
  {
    pm10: Type.Integer(),
    so2: Type.Integer(),
    co: Type.Integer(),
    o3: Type.Integer(),
    no2: Type.Integer(),
    kategori: Type.String(),
  },
);

// for classifying data wihout data uji
export const KnnManualSchema = Type.Object(
  {
    pm10: Type.Integer(),
    so2: Type.Integer(),
    co: Type.Integer(),
    o3: Type.Integer(),
    no2: Type.Integer(),
  },
);

export const KnnSchemaArray = Type.Array(
  Type.Object(
    {
      pm10: Type.Integer(),
      so2: Type.Integer(),
      co: Type.Integer(),
      o3: Type.Integer(),
      no2: Type.Integer(),
      kategori: Type.String(),
    },
  ),
);

export const KnnByIdParamSchema = Type.Object(
  {
    id: Type.Number(),
  },
);

export type KnnTypes = Static<typeof KnnSchema>
export type KnnManualTypes = Static<typeof KnnManualSchema>
export type KnnTypesArray = Static<typeof KnnSchemaArray>
export type KnnByIdParamTypes = Static<typeof KnnByIdParamSchema>;
