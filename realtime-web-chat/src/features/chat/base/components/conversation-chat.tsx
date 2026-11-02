"use client";

import { Button } from "@/components/ui/button";
import { MessagesSquareIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { CreateConversationModal } from "../../conversation";
import { useGetSelectedConversationDetails } from "@/hooks/use-select-conversation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const usernameAbreviation = (name: string) => {
  let nameAbreviation = "";

  const nameSplited = name.split(" ");

  for (let i = 0; i < nameSplited.length; i++) {
    if (!nameSplited[i].trim()) {
      nameSplited.splice(i, 1);
    }
  }

  nameAbreviation = nameSplited[0][0].toUpperCase();

  if (nameSplited.length > 1) {
    nameAbreviation += nameSplited[1][0].toUpperCase();
  }

  return nameAbreviation;
};

export const ConversationChat = ({ user }: ConversationChatProps) => {
  const [openNewChatModal, setOpenNewChatModal] = useState(false);

  const { conversationId, selectedConversation, setConversationId } =
    useGetSelectedConversationDetails();

  console.log(selectedConversation);

  const toggleNewChatModal = () => {
    setOpenNewChatModal((prev) => !prev);
  };

  return (
    <div className="relative flex h-svh w-full flex-col">
      {selectedConversation ? (
        <div className="relative flex h-full w-full flex-1 flex-col">
          <div className="absolute inset-0 flex h-16 w-full items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={selectedConversation.avatarUrl || ""}
                  alt={selectedConversation.title || "conversation-image"}
                />
                <AvatarFallback>
                  {selectedConversation.type === "PRIVATE" ? (
                    usernameAbreviation(selectedConversation.title || "WN")
                  ) : (
                    <UsersIcon />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-foreground text-sm font-semibold">
                  {selectedConversation.type === "GROUP"
                    ? selectedConversation.title
                    : selectedConversation.conversationMembers.filter(
                        (member) => member.userId !== user.id,
                      )[0].user.name}
                </span>
                <span className="text-muted-foreground text-xs font-normal">
                  {selectedConversation.type === "GROUP"
                    ? `${selectedConversation.conversationMembers.length} members`
                    : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4 p-4">
          <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-md">
            <MessagesSquareIcon />
          </div>

          <h2 className="text-foreground text-base font-semibold tracking-tight">
            No chat selected
          </h2>

          <p className="text-muted-foreground text-center text-sm leading-relaxed font-normal tracking-tight">
            Select a conversation from the list to read and <br /> reply, or
            start a new chat with one of your contacts.
          </p>

          <Button type="button" onClick={toggleNewChatModal}>
            Start a new chat
          </Button>
        </div>
      )}

      <CreateConversationModal
        open={openNewChatModal}
        onOpenChange={() => toggleNewChatModal()}
        type={"PRIVATE"}
        user={user}
      />
    </div>
  );
};
