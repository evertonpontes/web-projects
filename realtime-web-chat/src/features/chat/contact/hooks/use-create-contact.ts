"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContactAction } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContactSchema } from "../types";
import { toast } from "react-toastify";

export const useCreateContact = (onOpenChange?: (open: boolean) => void) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useHookFormAction(createContactAction, zodResolver(createContactSchema), {
    formProps: {
      defaultValues: {
        email: "",
        nickname: "",
      },
    },
    actionProps: {
      onSuccess: async ({ data }) => {
        await queryClient.invalidateQueries({
          queryKey: ["contacts", data.userId],
        });

        toast.success(`Contact ${data.nickname} added successfully!`);

        router.refresh();

        onOpenChange?.(false);
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "An error occurred while adding new contact");

        onOpenChange?.(false);
      },
    },
  });
};
