import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import {
  startNavigationProgress,
  resetNavigationProgress,
  NavigationProgress,
} from "@mantine/nprogress";

export function RouterTransition() {
  const router = useRouter();

  const handleStart = useCallback(
    (url: string) => url !== router.asPath && startNavigationProgress(),
    [router.asPath],
  );
  const handleComplete = () => resetNavigationProgress();
  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [handleStart, router.asPath, router.events]);

  return <NavigationProgress />;
}
