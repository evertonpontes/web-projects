"use client";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { PlusIcon, SearchIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { CreateContactModal } from "../../contact";
import {
  CreateConversationModal,
  useGetConversations,
} from "../../conversation";
import { useGetCurrent } from "@/features/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConversationType } from "@/generated/prisma/enums";

type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

interface SidebarProps {
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

const Sidebar = ({ user: userProps }: SidebarProps) => {
  const [openAddContactModal, setOpenAddContactModal] = useState(false);
  const [openNewChatModal, setOpenNewChatModal] = useState(false);
  const [conversationType, setConversationType] =
    useState<ConversationType | null>(null);
  const { data: user } = useGetCurrent();
  const { data: conversations } = useGetConversations(
    user ? user.id : userProps.id,
  );

  const toggleAddContactModal = () => {
    setOpenAddContactModal((prev) => !prev);
  };

  const toggleNewChatModal = (type?: ConversationType) => {
    if (!openNewChatModal) {
      if (type === "GROUP") {
        setConversationType("GROUP");
      } else if (type === "PRIVATE") {
        setConversationType("PRIVATE");
      }
    } else {
      setConversationType(null);
    }
    setOpenNewChatModal((prev) => !prev);
  };

  return (
    <div className="border-border bg-background text-foreground z-10 flex w-full flex-col rounded-2xl border md:w-94">
      <div className="flex w-full flex-col justify-center gap-6 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight md:text-xl">
            Chats
          </h2>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-full"
                >
                  <PlusIcon />
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuItem
                className="text-sm font-normal"
                onClick={() => toggleNewChatModal("PRIVATE")}
              >
                New chat
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm font-normal"
                onClick={() => toggleNewChatModal("GROUP")}
              >
                Create group
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm font-normal"
                onClick={toggleAddContactModal}
              >
                Add contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Chats search..." />
        </InputGroup>
      </div>
      <Separator />
      <div className="flex w-full flex-col">
        {conversations ? (
          conversations?.map((conversation) => (
            <div
              key={conversation.id}
              className="bg-background hover:bg-muted/50 border-border flex flex-1 items-center gap-4 border-b p-6"
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
                  {conversation.title}
                </span>
                {/*Last message */}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-4"></div>
        )}
      </div>
      <CreateContactModal
        open={openAddContactModal}
        onOpenChange={toggleAddContactModal}
      />
      <CreateConversationModal
        open={openNewChatModal}
        onOpenChange={() => toggleNewChatModal()}
        type={conversationType || "PRIVATE"}
        user={user || userProps}
      />
    </div>
  );
};

const SidebarContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex min-h-svh w-full p-8 md:p-10">{children}</div>;
};

export { Sidebar, SidebarContainer };
