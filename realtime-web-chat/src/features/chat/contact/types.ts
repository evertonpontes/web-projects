import z from "zod";

export const createContactSchema = z.object({
  contactId: z.string().min(1, "Contact is required!"),
  nickname: z.string(),
});

export type TCreateContact = z.infer<typeof createContactSchema>;
