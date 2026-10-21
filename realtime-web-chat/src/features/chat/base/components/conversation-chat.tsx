"use client";

import { Button } from "@/components/ui/button";
import { MessagesSquareIcon } from "lucide-react";
import { useState } from "react";
import { CreateConversationModal } from "../../conversation";

type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

interface ConversationChatProps {
  user: User;
}

export const ConversationChat = ({ user }: ConversationChatProps) => {
  const [openNewChatModal, setOpenNewChatModal] = useState(false);

  const toggleNewChatModal = () => {
    setOpenNewChatModal((prev) => !prev);
  };

  return (
    <div>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4 p-4">
        <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-md">
          <MessagesSquareIcon />
        </div>

        <h2 className="text-foreground text-base font-semibold tracking-tight">
          No chat selected
        </h2>

        <p className="text-muted-foreground text-center text-sm leading-relaxed font-normal tracking-tight">
          Select a conversation from the list to read and <br /> reply, or start
          a new chat with one of your contacts.
        </p>

        <Button type="button" onClick={toggleNewChatModal}>
          Start a new chat
        </Button>
      </div>

      <CreateConversationModal
        open={openNewChatModal}
        onOpenChange={() => toggleNewChatModal()}
        type={"PRIVATE"}
        user={user}
      />
    </div>
  );
};
