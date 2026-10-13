import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(255, "Name must be at most 255 characters long"),
  email: z.email("Invalid email address").max(255, "Email must be at most 255 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long").max(255, "Password must be at most 255 characters long"),
});

export type TSignUp = z.infer<typeof signUpSchema>;
