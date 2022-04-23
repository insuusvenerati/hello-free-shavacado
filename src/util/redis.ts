// import Redis from "ioredis";

import Redis from "ioredis";

// const redis = new Redis(process.env.REDIS_URL);

// export default redis;

const redisClient = new Redis(process.env.REDIS_URL, {
  reconnectOnError: function (err) {
    const targetError = "READONLY";
    if (err.message.slice(0, targetError.length) === targetError) {
      // Only reconnect when the error starts with "READONLY"
      return true; // or `return 1;`
    }
  },
});

redisClient.on("connect", () => {
  console.debug(`Connecting to redis "${process.env.REDIS_URL}"...`);
});

redisClient.on("ready", () => {
  console.debug("Connected to redis!");
});

redisClient.on("error", (err: Error) => {
  console.error({
    message: "Error with redis client",
    errorMessage: err.message,
    errorStack: err.stack,
    errorName: err.name,
  });
});

redisClient.on("close", () => {
  console.debug("[Redis]:closed");
});

redisClient.on("reconnecting", (time: Number) => {
  console.debug(`[Redis]:reconnecting - ${time}ms`);
});

redisClient.on("end", () => {
  console.debug("[Redis]:end");
});

redisClient.on("wait", () => {
  console.debug("[Redis]:wait");
});

export default redisClient;
