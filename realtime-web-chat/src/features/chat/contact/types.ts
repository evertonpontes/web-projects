import z from "zod";

export const createContactSchema = z.object({
  email: z.email().min(1, "Email is required!"),
  nickname: z.string(),
});

export type TCreateContact = z.infer<typeof createContactSchema>;
