"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Conversation,
  ConversationMember,
  User,
} from "@/generated/prisma/client";
import { useGetSelectedConversationDetails } from "@/hooks/use-select-conversation";
import { EllipsisIcon, UsersIcon } from "lucide-react";

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

type ConversationDetails = {
  conversationMembers: ({ user: User } & ConversationMember)[];
} & Conversation;

export const ConversationItem = ({
  conversation,
  user,
}: {
  conversation: ConversationDetails;
  user: User;
}) => {
  const { conversationId, setConversationId } =
    useGetSelectedConversationDetails();

  return (
    <div className="bg-background hover:bg-muted/50 border-border group/item relative flex flex-1 cursor-pointer items-center gap-4 border-b">
      <div
        className="flex w-full flex-1 items-center gap-4 p-4"
        onClick={() => {
          if (conversationId !== conversation.id) {
            setConversationId(conversation.id);
          }
        }}
      >
        <Avatar>
          <AvatarImage
            src={conversation.avatarUrl || ""}
            alt={conversation.title || "conversation-image"}
          />
          <AvatarFallback>
            {conversation.type === "PRIVATE" ? (
              usernameAbreviation(conversation.title || "WN")
            ) : (
              <UsersIcon />
            )}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <span className="text-foreground text-sm font-semibold">
            {conversation.type === "GROUP"
              ? conversation.title
              : conversation.conversationMembers.filter(
                  (member) => member.userId !== user.id,
                )[0].user.name}
          </span>
          {/*Last message */}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              size="icon-xs"
              variant="outline"
              className="absolute top-1/2 right-0 -translate-1/2 rounded-full opacity-0 group-hover/item:opacity-100"
            >
              <EllipsisIcon />
            </Button>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuItem className="text-sm font-normal">
            View Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm font-normal">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
