import { Static, Type } from '@sinclair/typebox';

export const ReviewSchema = Type.Object(
  {
    review: Type.String(),
  },
);

export type ReviewTypes = Static<typeof ReviewSchema>;
