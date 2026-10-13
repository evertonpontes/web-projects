"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signUpAction } from "../actions";
import { signUpSchema } from "../types";
import { toast } from "react-toastify";

export function useSignUp() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const form = useHookFormAction(signUpAction, zodResolver(signUpSchema), {
    formProps: {
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    },
    actionProps: {
      onSuccess: async ({ data }) => {
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });

        toast.success("Account created successfully!");

        router.push("/dashboard");
      },
      onError: async ({ error }) => {
        toast.error(error.serverError || "An error occurred while creating the account.");
      },
    },
  });

  return form;
}
