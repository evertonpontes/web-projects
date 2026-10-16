"use client";

import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../queries";

export const useGetContact = (userId: string) => {
  return useQuery({
    queryKey: ["contacts", userId],
    queryFn: getContacts,
  });
};
