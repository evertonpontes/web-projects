"use client";

import { useCallback, useSyncExternalStore } from "react";

const useQueryMedia = (query: string, defaultValue: boolean = false): boolean => {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined" || !("matchMedia" in window)) {
        return () => {};
      }

      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", callback);

      return () => {
        mediaQueryList.removeEventListener("change", callback);
      };
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      return defaultValue;
    }

    return window.matchMedia(query).matches;
  }, [query, defaultValue]);

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export { useQueryMedia };
