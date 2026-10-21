"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createConversationAction } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { createConversationSchema } from "../types";
import { toast } from "react-toastify";
import { ConversationType } from "@/generated/prisma/enums";
import { socket } from "@/lib/socket";

type UseCreateConversationProps = {
  onOpenChange?: (open: boolean) => void;
  type?: ConversationType;
};

export const useCreateConversation = ({
  onOpenChange,
  type,
}: UseCreateConversationProps) => {
  const router = useRouter();

  const { resetFormAndAction, ...props } = useHookFormAction(
    createConversationAction,
    zodResolver(createConversationSchema),
    {
      formProps: {
        defaultValues: {
          avatarUrl: "",
          description: "",
          membersIds: [],
          title: "",
          type,
        },
      },
      actionProps: {
        onSuccess: ({ data }) => {
          socket.emit("new chat", data);

          toast.success(`Conversation ${data.title} added successfully!`);

          router.refresh();

          resetFormAndAction();

          onOpenChange?.(false);
        },
        onError: ({ error }) => {
          toast.error(
            error.serverError ||
              "An error occurred while adding new conversation",
          );

          resetFormAndAction();

          onOpenChange?.(false);
        },
      },
    },
  );

  return props;
};
