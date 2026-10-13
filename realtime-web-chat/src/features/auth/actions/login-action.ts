"use server";

import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "../types";
import { auth } from "@/lib/auth";

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    const { user, token } = response;

    return user;
  });
