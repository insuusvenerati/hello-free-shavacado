/// <reference lib="webworker" />

let audioContext;

const ctx = self;

ctx.addEventListener("message", async (e) => {
  const audioData = e.data;
  if (!audioContext) {
    if (typeof AudioContext !== "undefined") {
      audioContext = new AudioContext();
    }
  }
  console.log(audioContext);
  const audioBuffer = await audioContext.decodeAudioData(audioData);
  const channelData = audioBuffer.getChannelData(0);
  const bufferLength = channelData.length;
  const dataArray = new Uint8Array(bufferLength);
  const sliceWidth = bufferLength / 400;
  let bytePos = 0;
  let lastBytePos = 0;

  for (let i = 0; i < bufferLength; i += sliceWidth) {
    const slice = channelData.slice(i, i + sliceWidth);
    const average = slice.reduce((acc, curr) => acc + Math.abs(curr), 0) / slice.length;
    const byteValue = average * 100;

    bytePos = Math.floor(i / sliceWidth);
    for (let j = lastBytePos; j < bytePos; j++) {
      dataArray[j] = byteValue;
    }
    lastBytePos = bytePos;
  }

  ctx.postMessage(dataArray);
});
