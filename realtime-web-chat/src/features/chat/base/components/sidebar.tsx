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

const Sidebar = () => {
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
              <DropdownMenuItem className="text-sm font-normal">
                New chat
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm font-normal">
                Create group
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm font-normal">
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
    </div>
  );
};

const SidebarContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex min-h-svh w-full p-8 md:p-10">{children}</div>;
};

export { Sidebar, SidebarContainer };
