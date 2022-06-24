import { AccountByIdParamSchema, AccountSchema } from './schema_types/account.schemas.types';

// export const PostAccountSchemas = {
//   response: {
//     201: {
//       statusCode: { type: 'number' },
//       error: { type: 'number' },
//       message: {
//         type: 'string',
//       },
//       data: AccountSchema,
//     },
//     400: {
//       statusCode: { type: 'number' },
//       error: { type: 'number' },
//       message: {
//         type: 'string',
//       },
//     },
//   },
// };

export const PostAccountSchemas = {
  body: AccountSchema,
};

export const GetAccountByIdSchemas = {
  params: AccountByIdParamSchema,
};

export const UpdateAccountSchemas = {
  body: AccountSchema,
  params: AccountByIdParamSchema,
};
