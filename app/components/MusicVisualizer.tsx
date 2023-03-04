import React, { useEffect, useRef } from "react";

interface Props {
  audioUrl: string;
}

const MusicVisualizer: React.FC<Props> = ({ audioUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const fetchAudio = async () => {
      if (!workerRef.current) {
        workerRef.current = new Worker("/music-viz.worker.js", { type: "module" });
      }

      workerRef.current.postMessage(audioUrl);

      const dataArray = await new Promise<Uint8Array>((resolve) => {
        const messageHandler = (e: MessageEvent) => {
          resolve(e.data as Uint8Array);
          workerRef.current?.removeEventListener("message", messageHandler);
        };
        workerRef.current?.addEventListener("message", messageHandler);
      });

      const barWidth = (canvas.width / dataArray.length) * 2.5;
      let barHeight: number;
      let x = 0;
      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] / 2;
        context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    fetchAudio();
  }, [audioUrl]);

  if (typeof AudioContext === "undefined") {
    return <p>AudioContext is not supported on this browser.</p>;
  }

  return <canvas ref={canvasRef} />;
};

export default MusicVisualizer;
