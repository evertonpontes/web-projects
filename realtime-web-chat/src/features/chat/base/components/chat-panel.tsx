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
import { getContacts } from "../../contact";
import { getConversations } from "../../conversation";

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

  await Promise.all([
    queryClient.query({
      queryKey: ["contacts", user?.id],
      queryFn: getContacts,
    }),
    queryClient.query({
      queryKey: ["conversations", user?.id],
      queryFn: getConversations,
    }),
  ]);

  if (!user) {
    redirect("/login");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarContainer>
        <Sidebar user={user} />
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
