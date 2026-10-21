"use client";

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
import { PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { CreateContactModal } from "../../contact";
import { ConversationList, CreateConversationModal } from "../../conversation";
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

const Sidebar = ({ user }: SidebarProps) => {
  const [openAddContactModal, setOpenAddContactModal] = useState(false);
  const [openNewChatModal, setOpenNewChatModal] = useState(false);
  const [conversationType, setConversationType] =
    useState<ConversationType | null>(null);

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
    <div className="border-border bg-background text-foreground z-10 flex h-full w-full flex-col overflow-hidden rounded-2xl border md:w-94">
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
      <ConversationList user={user} />
      <CreateContactModal
        open={openAddContactModal}
        onOpenChange={toggleAddContactModal}
      />
      <CreateConversationModal
        open={openNewChatModal}
        onOpenChange={() => toggleNewChatModal()}
        type={conversationType || "PRIVATE"}
        user={user}
      />
    </div>
  );
};

const SidebarContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-svh w-full p-8 md:p-10">{children}</div>;
};

export { Sidebar, SidebarContainer };
