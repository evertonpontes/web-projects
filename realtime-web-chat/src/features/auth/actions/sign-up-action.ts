"use server";

import { actionClient } from "@/lib/safe-action";
import { signUpSchema } from "../types";
import { auth } from "@/lib/auth";

export const signUpAction = actionClient.inputSchema(signUpSchema).action(async ({ parsedInput }) => {
  const { name, email, password } = parsedInput;

  const response = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  const { user, token } = response;

  return user;
});
