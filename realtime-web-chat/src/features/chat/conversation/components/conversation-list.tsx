"use client";

import { useGetConversations } from "../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { ConversationItem } from "./conversation-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessagesSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateConversationModal } from "./create-conversation-modal";

type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

interface ConversationListProps {
  user: User;
}

export const ConversationList = ({ user }: ConversationListProps) => {
  const queryClient = useQueryClient();

  const [openNewChatModal, setOpenNewChatModal] = useState(false);

  const toggleNewChatModal = () => {
    setOpenNewChatModal((prev) => !prev);
  };

  const { data: conversations } = useGetConversations(user.id);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("new chat", () => {
      queryClient.invalidateQueries({ queryKey: ["conversations", user.id] });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient, user.id]);

  return (
    <ScrollArea className="flex h-max w-full flex-col overflow-y-auto">
      {conversations && conversations.length > 0 ? (
        conversations?.map((conversation, index) => (
          <ConversationItem key={index} conversation={conversation} />
        ))
      ) : (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4 p-4">
          <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-md">
            <MessagesSquareIcon />
          </div>

          <h2 className="text-foreground text-base font-semibold tracking-tight">
            No conversations yet
          </h2>

          <p className="text-muted-foreground text-center text-sm leading-relaxed font-normal tracking-tight">
            You haven&apos;t create any conversation yet. <br /> Get started by
            creating new chats/groups to your list.
          </p>

          <Button type="button" onClick={toggleNewChatModal}>
            Start a new chat{" "}
          </Button>
        </div>
      )}

      <CreateConversationModal
        open={openNewChatModal}
        onOpenChange={() => toggleNewChatModal()}
        type={"PRIVATE"}
        user={user}
      />
    </ScrollArea>
  );
};
