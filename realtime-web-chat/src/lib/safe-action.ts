import { betterAuth } from "@next-safe-action/adapter-better-auth";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    console.error("Server error:", error);

    return error.message;
  },
});

export const authClient = actionClient.use(betterAuth(auth));
