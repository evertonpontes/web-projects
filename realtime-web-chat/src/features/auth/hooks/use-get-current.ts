"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrent } from "../query";

export function useGetCurrent() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrent,
  });
}
