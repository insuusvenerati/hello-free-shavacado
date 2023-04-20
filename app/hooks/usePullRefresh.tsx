import { useFetcher } from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";

export const usePullRefresh = () => {
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState<number>();
  const refreshContainer = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher();

  const initLoading = useCallback(() => {
    fetcher.load("/?index");
  }, [fetcher]);

  const handleTouchStart = (e: TouchEvent) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.targetTouches[0];
      const { screenY } = touch;
      const pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
      setPullChange(pullLength);
    },
    [startPoint],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (typeof pullChange === "undefined") return;
      setStartPoint(0);
      setPullChange(0);
      if (pullChange > 220) initLoading();
    },
    [initLoading, pullChange],
  );

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart, false);
    window.addEventListener("touchmove", handleTouchMove, false);
    window.addEventListener("touchend", handleTouchEnd, false);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart, false);
      window.removeEventListener("touchmove", handleTouchMove, false);
      window.removeEventListener("touchend", handleTouchEnd, false);
    };
  }, [handleTouchEnd, handleTouchMove]);

  return { refreshContainer, pullChange };
};
