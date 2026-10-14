"use server";

import { UserButton } from "@/components/user-button";
import { getCurrent } from "@/features/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { Sidebar, SidebarContainer } from "./sidebar";

const ChatPanel = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  const user = await queryClient
    .query({
      queryKey: ["current-user"],
      queryFn: getCurrent,
    })
    .catch(null);

  if (!user) {
    redirect("/login");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarContainer>
        <Sidebar />
        <main className="hidden flex-1 flex-col md:flex">
          <div className="flex h-10 w-full items-center justify-end">
            <UserButton />
          </div>
        </main>
      </SidebarContainer>
    </HydrationBoundary>
  );
};

export { ChatPanel };
