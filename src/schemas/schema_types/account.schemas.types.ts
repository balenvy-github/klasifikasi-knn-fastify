import { Static, Type } from '@sinclair/typebox';

const AccountSchemaData = Type.Object(
  {
    nama: Type.String(),
    email: Type.String({
      format: 'email',
    }),
    password: Type.String(),
    level: Type.KeyOf(
      Type.Object({
        admin: Type.String(),
        superadmin: Type.String(),
      }),
    ),
  },
);

const AccountByIdParamSchema = Type.Object(
  {
    id: Type.Number(),
  },
);

export type AccountTypes = Static<typeof AccountSchemaData>;
export type AccountByIdParamTypes = Static<typeof AccountByIdParamSchema>;

export {
  AccountByIdParamSchema,
  AccountSchemaData as AccountSchema,
};
