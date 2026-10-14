"use server";

import { UserButton } from "@/components/user-button";
import { getCurrent } from "@/features/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

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
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserButton />
      </HydrationBoundary>
    </div>
  );
};

export { ChatPanel };
