"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signOutAction } from "../actions";
import { toast } from "react-toastify";
import { useAction } from "next-safe-action/hooks";

export function useSignOut() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const form = useAction(signOutAction, {
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });

      toast.success("User signed out successfully!");

      router.push("/login");
    },
    onError: async ({ error }) => {
      toast.error(error.serverError || "An error occurred while signing out.");
    },
  });

  return form;
}
