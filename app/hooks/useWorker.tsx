import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";

type UseWorkerProps = {
  workerUrl: string;
  handleMessage?: (event: MessageEvent) => void;
};

export const useWorker = ({ workerUrl, handleMessage }: UseWorkerProps) => {
  invariant(workerUrl, "workerUrl is required");
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (window.Worker) {
      workerRef.current = new Worker(workerUrl, { type: "module" });
      if (handleMessage) {
        workerRef.current?.addEventListener("message", handleMessage);
      }
    }

    return () => workerRef.current?.terminate();
  }, [handleMessage, workerUrl]);

  return workerRef;
};
