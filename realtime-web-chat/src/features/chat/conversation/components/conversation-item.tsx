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
import { Conversation } from "@/generated/prisma/client";
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

export const ConversationItem = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  return (
    <div className="bg-background hover:bg-muted/50 border-border group/item relative flex flex-1 cursor-pointer items-center gap-4 border-b p-4">
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
          {conversation.title}
        </span>
        {/*Last message */}
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
