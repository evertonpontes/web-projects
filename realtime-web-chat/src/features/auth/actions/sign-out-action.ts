"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/safe-action";
import { headers } from "next/headers";

export const signOutAction = authClient.action(async ({ ctx }) => {
  await auth.api.signOut({
    headers: await headers(),
  });
});
