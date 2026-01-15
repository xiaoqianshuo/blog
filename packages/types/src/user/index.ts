import { z } from 'zod';

export const UserId = z.uuid().brand<'UserId'>();
export type UserId = z.infer<typeof UserId>;

export const User = z.object({
  id: UserId,
  email: z.email(),
  name: z.string().min(1),
  detail: z.object({
    age: z.number().int().min(0).optional(),
    gender: z.enum(['male', 'female']).optional(),
  }),
});
export type User = z.infer<typeof User>;

export const CreateUser = User.pick({
  email: true,
  name: true,
  detail: true,
});
export type CreateUser = z.infer<typeof CreateUser>;

export const UpdateUser = User.pick({
  id: true,
  email: true,
  name: true,
}).extend({
  detail: z
    .object({
      age: z.number().int().min(0).optional(),
      gender: z.enum(['male', 'female']).optional(),
    })
    .optional(),
});
export type UpdateUser = z.infer<typeof UpdateUser>;
