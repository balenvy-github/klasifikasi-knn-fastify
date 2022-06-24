import { Static, Type } from '@sinclair/typebox';

export const AuthLoginSchema = Type.Object(
  {
    email: Type.String({
      format: 'email',
    }),
    password: Type.String(),
  },
);

export type AuthLoginTypes = Static<typeof AuthLoginSchema>;
