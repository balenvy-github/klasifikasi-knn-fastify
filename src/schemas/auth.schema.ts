import { AuthLoginSchema } from './schema_types/auth.schemas.types';

export const LoginAuthSchemas = {
  body: AuthLoginSchema,
};

export const RefreshTokenSchemas = {
  body: AuthLoginSchema,
};
