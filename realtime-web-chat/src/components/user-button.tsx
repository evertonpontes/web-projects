"use client";

import { useGetCurrent, useSignOut } from "@/features/auth";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCallback } from "react";
import { LogOutIcon, User2Icon } from "lucide-react";

const UserButton = () => {
  const { data: user, isLoading: isLoadingUser } = useGetCurrent();
  const { execute } = useSignOut();

  const usernameAbreviation = useCallback(() => {
    let nameAbreviation = "";

    if (user) {
      const nameSplited = user.name.split(" ");

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
    }

    return "WN";
  }, [user]);

  if (!user && isLoadingUser) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage alt="user-avatar" src={user?.image || ""} />
          <AvatarFallback>{usernameAbreviation()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-sidebar w-72">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt="user-avatar" src={user?.image || ""} />
              <AvatarFallback>{usernameAbreviation()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-foreground font-sans text-sm font-semibold">
                {user?.name}
              </p>
              <p className="text-muted-foreground font-mediun font-sans text-xs">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User2Icon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => execute()}>
            <LogOutIcon />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserButton };
